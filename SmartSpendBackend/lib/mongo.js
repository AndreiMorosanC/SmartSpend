import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/smartspend";

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri, {
    autoIndex: true,
  });
  console.log("✅ MongoDB conectado");
}
