import { ProductManagerMongo } from "./productManagerMongo.js"
import { CartManagerMongo } from "./cartManagerMongo.js";
import { connectDB } from "../../config/dbConnection..js";
import { UsersMongo } from "./users.mongo.js";




connectDB();
const productSDao = new ProductManagerMongo();
const usersDao = new UsersMongo();
const cartService = new CartManagerMongo();


export {productSDao, cartService, usersDao }