import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide Name"]
    },
    email: {
        type: String,
        required: [true, "Provide Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide Password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {  // ✅ Fixed typo: "referesh_token" → "refresh_token"
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: null  // ✅ Fixed default value
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Address" // ✅ Make sure the model name matches your actual schema
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "CartProduct"
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Order"
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: null  // ✅ Fixed default value
    },
    role: {
        type: String, // ✅ Fixed typo: "tpye" → "type"
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema); // ✅ Ensure model name matches reference

export default UserModel;
