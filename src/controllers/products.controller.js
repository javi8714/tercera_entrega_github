<<<<<<< HEAD
import { ProductService } from '../services/products.service.js';
import { ProductManagerMongo } from '../dao/managers/productManagerMongo.js';
const pm = new ProductManagerMongo()

export class ProductsController {

    static getProducts = async (req, res) => {
        try {
            let { limit, page, sort, category } = req.query
            const options = {
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                sort: { price: Number(sort) }
            };
            if (!(options.sort.price === -1 || options.sort.price === 1)) {
                delete options.sort
            }
            
            // Devuelve un array con las categorias disponibles y compara con la query "category"
            const categories = await ProductService.categories();
            const result = categories.some(categ => categ === category)
            if (result) {
                const products = await ProductService.getProducts({ category }, options);
                const { prevLink, nextLink } = links(products);
                const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
                return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
            }
            const products = await ProductService.getProducts({}, options);
            const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
            const { prevLink, nextLink } = links(products);
            return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
        } catch (err) {
            console.log(err);
        }
    };

    static getProductID = async (req, res) => {
        const { pid } = req.params
        const productfind = await ProductService.getProductById(pid);
        res.json({ status: "success", productfind });
    };

    static createProduct = async (req, res) => {
        const obj = req.body
        const newproduct = await ProductService.addProduct(obj);
        res.json({ status: "success", newproduct });
    };

    static updateProduct = async (req, res) => {
        const { pid } = req.params
        const obj = req.body
        const updatedproduct = await ProductService.updateProduct(pid, obj);
        console.log(updatedproduct)
        res.json({ status: "success", updatedproduct });
    };

    static deleteProduct = async (req, res) => {
        const id = req.params.pid
        const deleteproduct = await ProductService.deleteProduct(id);
        res.json({ status: "success", deleteproduct });
    };
=======
//importamos la capa de servico
import { ProductsService } from "../services/products.service.js";

import { productSDao } from "../dao/managers/index.js";

export class ProductsController { 
     static getProducts = async (req, res) => {
        try {
            const limit = req.query.limit;
            const products =  await ProductsService.getProducts;
            let resultado = 0;
            if (limit) {
                
                //devolver productos de acuerdo al limite
                const limite = parseInt(req.query.limit);
                console.log("limite: ", limite);
                if (limite > 0) {
                    resultado = products.slice(0,limite);
                } else {
                    resultado = products;
                }
                res.send(resultado);
    
            } else {
                res.json({ status: "success", data: products });
            }
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    };

    static getProduct = async (req, res) => {
        try {
            let pid = req.params.pid;
            let result = await productSDao.getProductById(pid);
            res.json({ status: 'success', data: result });
        } catch (error) {
            res.json({ status: 'error', message: error.message });
            //throw new Error(error.message);
        }
    };

    static createProduct = async (req,res)=>{
        try {
            const productInfo = req.body;
            const productsCreate = await ProductsService.createPrtoduct(productInfo);
            res.json({status:"succcess", data:productsCreate, message:"producto creado"})
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    };

    static updateProduct = async (req, res) =>{
        try {
            let pid = req.params.pid;
            let product = req.body;
            let result =  await productSDao.updateProduct(pid, product);
            result.id = pid;
            res.json({ status: 'success', data: result });
        } catch (error) {
            res.json({ status: 'error', message: error.message });
            //throw new Error(error.message);
        }
    };

    static deleteProduct = async (req, res) => { 
        try {
            let pid = req.params.pid;
            let result =  await productSDao.deleteProduct(pid);
            res.json({ status: "success", data: deleteProduct, message: "Producto borrado!" });
        } catch (error) {
            res.json({ status: 'error', message: error.message });
        }
    };
    
>>>>>>> e352251ab31b9a2df224bdcf58a0b0d77932742a
}