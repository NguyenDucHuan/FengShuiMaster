const adminService = require("../services/adminService");
const userService = require("../services/userService");

const getAllUser = async (req, res) => {
    try {
        const users = await adminService.handleGetAllUser();
        if (!users) {
            return res.status(400).json({ errCode: 1, message: "Cannot get user" });
        }
        return res.status(200).json({ errCode: 0, message: "Get user success", users: users });
    } catch (error) {
        console.error("Error in handleUserRegister:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await adminService.handleGetUserById(id);
        if (!user) {
            return res.status(400).json({ errCode: 1, message: "Cannot get user" });
        }
        return res.status(200).json({ errCode: 0, message: "Get user success", user: user });
    } catch (error) {
        console.error("Error in handleUserRegister:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { email, password, gender, name, birth, zodiac } = req.body;
        const message = await userService.handleUserRegister(email, password, gender, name, birth, zodiac);
        if (message.errCode !== 0) {
            return res.status(400).json(message);
        } else {
            return res.status(200).json(message);
        }
    } catch (error) {
        console.error("Error in handleUserRegister:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, gender, name, birth, zodiac } = req.body;
        const message = await adminService.handleUserUpdate(id, email, password, gender, name, birth, zodiac);
        if (message.errCode !== 0) {
            return res.status(400).json(message);
        } else {
            return res.status(200).json(message);
        }
    }
    catch (error) {
        console.error("Error in handleUserRegister:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const message = await adminService.handleChangeUserStatus(id, status);
        if (message.errCode !== 0) {
            return res.status(400).json(message);
        } else {
            return res.status(200).json(message);
        }
    }
    catch (error) {
        console.error("Error in handleUserRegister:", error);
        return res.status(500).json({ errCode: 1, message: "Server error", error: error.message });
    }
}

module.exports = {
    getAllUser: getAllUser,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    changeUserStatus: changeUserStatus,
};