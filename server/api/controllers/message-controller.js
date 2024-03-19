const { Server } = require("socket.io");
const messageModel = require("../models/message-model");
const server = require("http").createServer();
const io = new Server(server);

const discussion = async (req, res) => {
    const { from, to, text } = req.body;

    const newMessage = new messageModel({ from, to, text });

    try {
        await newMessage.save();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while saving the message.",
            error: error.message
        });
    }

    // Envoi du message en temps réel
    io.emit("newMessage", newMessage);

    res.status(201).json({
        success: true,
        message: "Message sent successfully :)",
        newMessage
    });
};

io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });
});

module.exports = discussion;
