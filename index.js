import express from "express";
import { addReceipt } from "./receipts.js";

const app = express();

app.use(express.json());

app.post("/receipts/process", async (req, res) => {
    const { retailer, purchaseDate, purchaseTime, total, items } = req.body;
    const receipt = await addReceipt(retailer, purchaseDate, purchaseTime, total, items);
    return res.json({
        id: receipt
    })
})


export default app;
