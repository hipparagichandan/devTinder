// Forcing to resolve the MongoDB SRV DNS records using Google or Cloudflare DNS instead of your local or ISP's default DNS
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); 

const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect(process.env.DB_CONNECTION_SECRET)
}

module.exports = connectDB;

