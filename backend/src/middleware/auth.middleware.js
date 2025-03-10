import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({ message: 'Not Authorized, No Token' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            console.log('Token verification failed');
            return res.status(401).json({ message: 'Not Authorized, Token Failed' })
        }

        // console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            // console.log('User not found for ID:', decoded.userId);
            return res.status(404).json({ message: 'User not found' })
        }
        req.user = user
        next()
    } catch (error) {
        console.log('Error in protectRoute:', error);
        return res.status(401).json({ message: 'Not Authorized, Token Failed' })
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ message: 'User is authenticated', user: req.user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}