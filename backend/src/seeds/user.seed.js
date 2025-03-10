import { config } from "dotenv";
import { connectDB } from '../db/db.js'
import User from "../models/user.model.js"
config();

const seedUsers = [
    // Female Users
    {
        email: "ananya.patel@example.com",
        fullname: "Ananya Patel",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        email: "sanya.sharma@example.com",
        fullname: "Sanya Sharma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        email: "diya.malhotra@example.com",
        fullname: "Diya Malhotra",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        email: "neha.kumari@example.com",
        fullname: "Neha Kumari",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        email: "isha.reddy@example.com",
        fullname: "Isha Reddy",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        email: "aanya.nair@example.com",
        fullname: "Aanya Nair",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        email: "kavya.menon@example.com",
        fullname: "Kavya Menon",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
        email: "priya.nair@example.com",
        fullname: "Priya Nair",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },

    // Male Users
    {
        email: "arjun.singh@example.com",
        fullname: "Arjun Singh",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        email: "vihaan.sharma@example.com",
        fullname: "Vihaan Sharma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        email: "dev.agarwal@example.com",
        fullname: "Dev Agarwal",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        email: "arav.murthy@example.com",
        fullname: "Arav Murthy",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        email: "krishna.patel@example.com",
        fullname: "Krishna Patel",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        email: "vihaan.kumar@example.com",
        fullname: "Vihaan Kumar",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        email: "arjun.menon@example.com",
        fullname: "Arjun Menon",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
        email: "siddharth.nair@example.com",
        fullname: "Siddharth Nair",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();
