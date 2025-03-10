import cloudinary from "../db/cloudinary.js"
import { getReceiverSocketId, io } from "../db/socket.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUserforSidebar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id

        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('fullname profilePic')

        res.status(200).json(filterUsers)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })

    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort('createdAt')
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const { text, image } = req.body
        const senderId = req.user._id
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image
        })
        await newMessage.save()
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        res.status(200).json(newMessage)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}