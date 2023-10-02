import dotenv from "dotenv";
dotenv.config();

export const config = {
    server : {
        port:process.env.PORT,
        secretSession:process.env.SECERT_SESSION
    },
    FileSystem: {
        prdoductsFile:"products.json",
        cartsFile:"carts.json",º
    },
    mongo:{
       url:process.env.MONGO_URL
    },
    github:{
        clientId:"Iv1.e4a88cda317cbcdd",
        clienteSecret:"291147b83fb3698d297115a0787e0abae0a3f6a4",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    }
};