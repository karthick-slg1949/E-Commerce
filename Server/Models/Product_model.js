import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : {
        type : String
    },
    umage : {
        type : Array,
        default : []
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "category"
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "subCategory"
        }
    ],
    unit : {
        type : String,
        default: ""
    },
    stock : {
        type : Number,
        default : null
    },
    price : {
        type : Number,
        default : null
    },
    discount : {
        type : Number,
        default : null
    },
    discription : {
        type: String,
        default : ""
    },
    more_details :{
        type : Object,
        default:{}
    },
    publish : {
        type : Boolean,
        default : true
    }
},{
    Timestamp : true
})

const ProductModel = mongoose.model("Product",productSchema)

export default ProductModel