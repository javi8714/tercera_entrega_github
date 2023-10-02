<<<<<<< HEAD
import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { checkRole, checkUserAuthenticated } from "../middlewares/auth.js";

=======
import { Router } from "express"; 
import { productSDao } from "../dao/managers/index.js";
import { ProductsController } from "../controllers/products.controller.js";
>>>>>>> e352251ab31b9a2df224bdcf58a0b0d77932742a

const router = Router()

<<<<<<< HEAD
router.get('/', ProductsController.getProducts)
router.get("/:pid", ProductsController.getProductID);
router.post("/", checkUserAuthenticated, checkRole(["admin", "superadmin"]), ProductsController.createProduct);
router.put("/:pid", checkUserAuthenticated, ProductsController.updateProduct);
router.delete("/:pid", checkUserAuthenticated, checkRole(["admin"]), ProductsController.deleteProduct);
=======
const router = Router();

//const validateFields = (req,res,next)=>{
//    const productInfo = req.body
//    if (!productInfo.title || !productInfo.description || !productInfo.price || !productInfo.code || !productInfo.stock || !productInfo.status || !productInfo.category) {
//        return res.json({ status: "error", message: "Campos incompletos! Completar." })
//    } else {
//        next();
//    }
//};

// Obtengo los prod de acuerdo al limite de prod que ingrese
router.get("/", ProductsController.getProducts);
// Retorno el prod por id: http://localhost:8080
router.get("/:pid", ProductsController.getProduct);
// Doy de alta el producto
router.post("/", ProductsController.createProduct);
// Actualizo el producto segun id
router.put("/:pid", ProductsController.updatePrtoduct);
// Doy de baja el producto segun ID
router.delete("/:pid", ProductsController.deleteProduct);



export {router as productsRouter}

>>>>>>> e352251ab31b9a2df224bdcf58a0b0d77932742a

export {router as productsRouter}