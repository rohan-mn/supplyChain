# 🚀 Supply Chain Blockchain System using MultiChain

This project demonstrates a simple blockchain-based supply chain tracking system built using **MultiChain**, **Node.js**, and **Express**. It allows you to publish and fetch product shipment details on a private blockchain.

## 📦 Features

- Publish supply chain updates to a MultiChain stream
- Retrieve transaction history for product updates
- RESTful API interface via Express
- JSON-formatted responses
- Uses `.env` for secure credential management

## 🛠 Tech Stack

- 🧱 Blockchain: MultiChain
- 🔗 Backend: Node.js + Express
- 🔒 Authentication: Basic Auth via RPC credentials
- 🌐 API: REST (JSON)
- 🔧 Tools: dotenv, axios, body-parser, cors

## 📁 Directory Structure

```
.
├── index.js          # Main Express server
├── .env              # Environment variables (ignored by git)
├── .gitignore        # Git ignore rules
├── README.md         # This file
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/rohan-mn/supplyChain.git
cd supplyChain
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```env
RPC_USER=your_multichain_user
RPC_PASSWORD=your_rpc_password
RPC_PORT=8367
CHAIN_NAME=supplychain
```

> ⚠️ Important: Do not commit your `.env` file to GitHub.

### 4. Start the server

```bash
node index.js
```

## 📡 API Endpoints

| Method | Endpoint        | Description                       |
|--------|------------------|-----------------------------------|
| GET    | `/getChainInfo`  | Get general blockchain info       |
| GET    | `/getAddress`    | Get the first wallet address      |
| POST   | `/publish`       | Publish product info to blockchain |
| GET    | `/fetch`         | Fetch all stream entries          |

## 🧪 Sample curl Test

```bash
curl -X POST http://localhost:3000/publish \
  -H "Content-Type: application/json" \
  -d '{"productId": "P123", "details": "Shipped from Pune to Mumbai"}'
```

## 🧾 Sample JSON Response (GET /fetch)

```json
[
  {
    "key": "P123",
    "data": "Shipped from Pune to Mumbai",
    "txid": "ef9d1b6f96f594bf9ffeeac424bfa0dad6bd3bcfce6ca361c063b5a9ad414209",
    "blocktime": 1753867977
  }
]
```
