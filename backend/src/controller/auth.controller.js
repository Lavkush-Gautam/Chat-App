import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../db/utils.js'
import cloudinary from '../db/cloudinary.js'
export const SignupController = async (req, res) => {
    const { email, fullname, password } = req.body
    try {
        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long" })
        }
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            fullname,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)

            await newUser.save()
        }
        else {
            return res.status(400).json({ message: "Invalid data" })
        }

        res.status(200).json({ message: "Signup Successful", user: newUser })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const LoginController = async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken(user._id, res)
        res.status(200).json({ message: "Login Successful", user })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const LogoutController = async (req, res) => {
    try {
        res.clearCookie('jwt', "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Successful" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }


}

export const updateProfileController = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userId = await User.findById(req.user._id)
        if (!profilePic) {
            return res.status(400).json({ message: "Please select an image" })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url
        }, { new: true })
        res.status(200).json({ message: "Profile Updated", user: updatedUser })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}