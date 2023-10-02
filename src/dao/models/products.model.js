import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { productCollection } from "../../constants/index.js";


//const productCollection="products"
const productSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default:0
    },
    thumbnail: {
        type: String,
        required: false 
    },
    code: {
        type: String,
        unique: true, 
        required: true
    },
    category: {
        type: String,
        required: true
        //enum: ["Ropa","Perfumes","Deportes" ]
    },
    status: {
        type: Boolean,
        default: true
    }
})
productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productCollection,productSchema);