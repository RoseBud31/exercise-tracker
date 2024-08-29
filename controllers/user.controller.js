const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({"message": "Failed to create user"});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({"message": "Failed to retrieve all users"});
    }
}

const getUserById = async (req, res) => {
    const { id } = req.body;
    try {
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({"message": "User id does not exist"});
        }
        res.status(200).json(userExists);
    } catch (error) {
        res.status(500).json({"message": "Failed to retrieve user with said id"});
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById
}