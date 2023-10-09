export const receipts = {

}

let id_tracker = 1;

// Helper function to process receipt and add it to my data set
export const addReceipt = async (retailer, purchaseDate, purchaseTime, total, items) => {
    const id = id_tracker.toString();
    id_tracker++;
    receipts[id] = {
        retailer,
        purchaseDate,
        purchaseTime,
        total,
        items
    }
    return id;
}

const alphanumericPoints = str => {
    let count = 0;
    for (let char of str) {
        if (/^[a-zA-Z0-9]+$/.test(char)) count++;
    }
    return count;
}

const itemCountPoints = num => {
    if (num === 1) return 0;
    if (num % 2 === 0) return (num / 2) * 5;
    else return ((num - 1) / 2) * 5;
}

const itemDescriptionsPoints = items => {
    let count = 0;
    for (let item of items) {
        const description = item.shortDescription.trim()
        const length = description.length;
        if (length % 3 === 0) {
            count += Math.ceil(parseFloat(item.price) * 0.2);
        }
    }
    return count;
}

const purchaseDateOdd = date => {
    const arr = date.split("-");
    const day = parseInt(arr[2]);
    if (day % 2 !== 0) return 6;
    else return 0;
}

const purchaseTimePoints = time => {
    const arr = time.split(":");
    const hour = parseInt(arr[0]);
    const minute = parseInt(arr[1]);
    if ((hour >= 14 && minute > 0) && hour < 16) return 10;
    else return 0;
}


// helper function to calculate points by id
export const getPoints = async (id) => {
    if (!id || !receipts[id]) return null;
    const receipt = receipts[id];
    let points = 0;
    // Points for alphanumeric chars in retailer name
    points += alphanumericPoints(receipt.retailer);
    // Points for round dollar total
    if (receipt.total % 1 === 0) points += 50;
    // Points for total multiple of .25
    if ((receipt.total / 0.25) % 1 === 0) points += 25;
    // points for every two items on receipt
    points += itemCountPoints(receipt.items.length);
    // points for item descriptions
    points += itemDescriptionsPoints(receipt.items);
    // points for purchase date being odd
    points += purchaseDateOdd(receipt.purchaseDate);
    // points for purchase time
    points += purchaseTimePoints(receipt.purchaseTime);
    return points;
}


// helper function to validate inputs of receipt
export const isValidReceipt = async (retailer, purchaseDate, purchaseTime, total, items) => {
    if (!retailer || !purchaseDate || !purchaseTime || !total || !items) {
        return false;
    }
    if (typeof retailer !== "string") return false;
    if (typeof purchaseDate !== "string" || isNaN(Date.parse(purchaseDate))) return false;
    if (typeof purchaseTime !== "string" || !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(purchaseTime)) return false;
    if (typeof total !== "string") return false;
    if (!Array.isArray(items) || items.length < 1) return false;

    for (let item of items) {
        if (!item.shortDescription || !item.price) return false;
        if (typeof item.shortDescription !== "string") return false;
        if (typeof item.price !== "string") return false;
    }
    return true;
}
