// const dotenv = require("dotenv");
// const express = require("express");
// const bcrypt = require("bcrypt");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// dotenv.config();

// const app = express();

// app.use(express.json());

// const port = process.env.PORT || 3000;

// app.post("/signup", async (req, res) => {
//   try {
//     const user = req.body;
//     if (!user.email || !user.password || !user.name) {
//       return res.status(400).send({ message: "invalid user credentials" });
//     }
//     const userDetails = await prisma.users.findUnique({
//       where: { email: user.email },
//     });
//     if (userDetails) {
//       return res
//         .status(400)
//         .send({ message: "user with this email already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     await prisma.users.create({
//       data: user,
//     });
//     return res.status(200).send({ message: "signup successful" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ message: "internal server error" });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).send({ message: "Email and password are required" });
//   }

//   try {
//     const user = await prisma.users.findUnique({
//       where: {
//         email,
//       },
//     });
//     if (user) {
//       const isPasswordCorrect = await bcrypt.compare(password, user.password);
//       if (isPasswordCorrect) {
//         return res.status(200).send({ message: "User logged in successfully" });
//       } else {
//         return res.status(401).send({ message: "Wrong password" });
//       }
//     } else {
//       return res.status(404).send({ message: "User does not exist" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ message: "Internal server error" });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports = { app, prisma };

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json()); 

app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!!");
});

const productRoutes = require("./routes/voter/productRoutes"); 
app.use('/api/products', productRoutes);

const { voterAuthRoutes } = require("./routes/voter/auth");

app.use("/api/voter/auth", voterAuthRoutes);

app.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app };

