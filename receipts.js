export const receipts = {

}

let id_tracker = 1;


export const addReceipt = async (retailer, purchaseDate, purchaseTime, total, items) => {
    const id = id_tracker;
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
