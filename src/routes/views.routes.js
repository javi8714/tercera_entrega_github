import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";
import { checkUserAuthenticated, showLoginView } from "../middlewares/auth.js";



const router = Router();


//routes

router.get("/", ViewsController.renderHome);
router.get("/realtimeproducts", ViewsController.rendeRealTimeProducts);
router.get("/chat", ViewController.renderChat);
router.get("/registro", showLoginView, Viewsontroller.renderRegistro);
router.get("/login", showLoginView, ViewsController.renderLogin);
router.get("/cambio-password", showLoginView, ViewsController.renderCambioPassword);
router.get("/profile", checkUserAuthenticated, ViewsController.renderProfile);

export {router as viewsRouter};