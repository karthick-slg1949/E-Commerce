import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    orderId : {
        type : String,
        required : [true, "Provide  orderId"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "Product"
    },
    Product_details : {
        name : String,
        image : Array,
    },
    paymentId : {
        type : String,
        default : ""
    },
    PaymentStatus : {
        type : String,
        default : ""
    },
    DeliveryAddress : {
        type : mongoose.Schema.ObjectId,
        ref : "address"
    },
    SubTotalAmount : {
        type : Number,
        default : 0
    },
    TotalAmount : {
        type : Number,
        default : 0 
    },
    InvoiceReceipt  :  {
        type : String,
        default : ''
    }
},{
    timestamps : true
})

const OrderModel = mongoose.model("order",OrderSchema)

export default OrderModel