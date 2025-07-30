const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();


const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Multichain RPC config
const rpcUser = process.env.RPC_USER;
const rpcPassword = process.env.RPC_PASSWORD;
const rpcPort = 8367; 
const chainName = process.env.CHAIN_NAME;


const rpcURL = `http://127.0.0.1:${rpcPort}`;

// RPC caller function
async function callMultiChain(method, params = []) {
    const payload = {
        method,
        params,
        id: Date.now(),
        
    };

    const auth = {
        username: rpcUser,
        password: rpcPassword
    };

    try {
        const response = await axios.post(rpcURL, payload, { auth });
        if (response.data.error) throw new Error(response.data.error.message);
        return response.data.result;
    } catch (err) {
        console.error(`Error in callMultiChain (${method}):`, err.message);
        throw err;
    }
}

// Get Chain Info
app.get("/getChainInfo", async (req, res) => {
    try {
        const result = await callMultiChain("getinfo");
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Wallet Address
app.get("/getAddress", async (req, res) => {
    try {
        const addresses = await callMultiChain("getaddresses");
        res.json({ address: addresses[0] || "No address found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Publish to Stream
app.post("/publish", async (req, res) => {
    try {
        const { productId, details } = req.body;

        if (!productId || !details) {
            return res.status(400).json({ error: "Missing productId or details" });
        }

        const hexData = Buffer.from(details).toString("hex");
       await callMultiChain("publish", ["productstream", String(productId), hexData]);

        res.json({ message: "Published successfully to blockchain" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch Stream Items
app.get("/fetch", async (req, res) => {
    try {
        const items = await callMultiChain("liststreamitems", ["productstream"]);
        const formatted = items.map(item => {
            const key = item.key || (item.keys && item.keys[0]) || "N/A";
            return {
                key,
                data: Buffer.from(item.data, "hex").toString(),
                txid: item.txid,
                blocktime: item.blocktime
            };
        });
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

