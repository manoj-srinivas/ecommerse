import express from "express";
import connectToMongoDB from "./database.js";
import dotenv from "dotenv";
import index from "./index.js";
import { verifyToken } from "./src/middlewares/authorization.js";
import { unless } from "./src/helpers/common.js";
import cors from "cors";
import colors from 'colors';


const app = express();
dotenv.config();

// cors options
var whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  exposedHeaders: "Content-Type, X-Auth-Token",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
  // allowedHeaders: ["Content-Type", "application/json"],
};

//connect to database
connectToMongoDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/api/v1",
  unless(
    verifyToken,
    "/auth/signUp",
    "/auth/signIn",
    "/auth/customerSignUp",
    "/auth/customerSignIn"
  ),
  index
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(colors.rainbow(`Server is running on port ${PORT}`)));
