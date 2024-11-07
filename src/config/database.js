const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

module.exports = { prisma, connectDB };