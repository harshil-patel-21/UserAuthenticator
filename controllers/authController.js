import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) =>{
    try {
        const {username, password} = req.body;

        if(!username){
            return res.send({message:'username is required'})
        }
        if(!password){
            return res.send({message:'password is required'})
        }

        //existing user
        const existingUser = await userModel.findOne({username})

        //check user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'user already exist'
            })
        }

        //registering user
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new userModel({
            username,
            password:hashedPassword
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
}

export const loginController = async (req,res) =>{
    try {
        const {username, password} = req.body
        //validation
        if(!username || !password){
            return res.status(404).sen({
                success:false,
                message:'Invalid Username or Password'
            })
        }

        //check user
        const user = await userModel.findOne({username})
        if(!username){
            return res.status(404).send({
                success:false,
                message:'user is not register',
            })
        }

        //
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'invalid password'
            })
        }

        res.status(200).send({
            success:true,
            message: 'login succesfully',
            user:{
                username:user.username, 
            },
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}
