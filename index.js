import express from "express";
import { addReceipt, getPoints } from "./receipts.js";

const app = express();

app.use(express.json());

app.post("/receipts/process", async (req, res) => {
    const { retailer, purchaseDate, purchaseTime, total, items } = req.body;
    if (!retailer || !purchaseDate || !purchaseTime || !total || !items) {
        res.status(400)
        return res.send({"Error": "The receipt is invalid"})
    }
    const receipt = await addReceipt(retailer, purchaseDate, purchaseTime, total, items);
    return res.json({
        id: receipt
    })
})

app.get("/receipts/:id/points", async (req, res) => {
    const { id } = req.params;
    const points = await getPoints(id);
    if (points === null) {
        res.status(404)
        return res.send({"Error": "No receipt found for that id"})
    }
    return res.json({
        points: points
    })
})


export default app;
