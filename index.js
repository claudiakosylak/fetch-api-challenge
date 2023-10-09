import express from "express";
import { addReceipt, getPoints } from "./receipts.js";

const app = express();

app.use(express.json());

app.post("/receipts/process", async (req, res) => {
    const { retailer, purchaseDate, purchaseTime, total, items } = req.body;
    const receipt = await addReceipt(retailer, purchaseDate, purchaseTime, total, items);
    return res.json({
        id: receipt
    })
})

app.get("/receipts/:id/points", async (req, res) => {
    const { id } = req.params;
    const points = await getPoints(id);
    return res.json({
        points: points
    })
})


export default app;
