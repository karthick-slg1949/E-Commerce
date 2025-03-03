import sendEmail from "../Config/SendEmail.js";
import UserModel from "../Models/User_model.js";
import bcrypt from 'bcryptjs'
import verifyEmailTemplate from "../Utils/VerifyEmailTemplate.js";

//check the name,email,password is available are not
export async function registerUserController(request,response){
    try{
        const {name, email, password} = request.body
        if(!name || !email || !password ){
            return response.status(400).json({
                message : "Provide email, name, password",
                error : true,
                success  : false
            })
        }
        //check the email is alredy used or not
        const user = await UserModel.findOne({email})
        if(user){
            return response.json({
                message : "Alredy Registered The Email",
                error : true,
                success : false
            })
        }
        //change plain password to hashed password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashpassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTENT_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from Blinkit",
            html : verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            
            })
        })
        return response.json({
            message : "User Registered Successfully",
            error : false,
            success : true,
            data : save
        })
    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
             
        })
    }
}
export async function verifyEmailController(request,response){
    try {
        const {code} = request.body

        const user =await UserModel.findOne({_id : code})

        if(!user){
            return response.status(400).json({
                message : "Invalid Code",
                error : true,
                success : false
            })
        }

        const updateUser =await UserModel.updateOne({_id : code},{
            verify_email : true
        })
        return response.json({
            message : "Verify Email Done.",
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : true
        })
    }
}

//login controller
export async function loginController(request,response){
    try {
        const {email, password} = request.body

        const user = await UserModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }
        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact to Admin",
                error : true,
                success : false
            })
        } 

        const checkPassword = await  bcrypt.compare(password,user.password)

        if(!checkPassword){
            return  response.status(400).json({
                message : "Check Your Password",
                error : true,
                success : false
            })
        }
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            sucess : false
        })
    }
}