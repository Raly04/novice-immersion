/** @format */

const pub = require("../models/publication-model");
const reaction = require("../models/reaction-model");
const coms = require("../models/comment-model");
const event = require("../models/alert-model");
const Notification = require("../models/notification-model");
const model = require("../models/auth-model");
const fs = require("fs");
const path = require("path");

//CREATE A PUB
const createPub = async (req, res) => {
  const { description, category, tag, user, pubsImage } = req.body;
  const result = await pub.create({
    description,
    // path: cheminFichier,
    tag,
    user,
    images: pubsImage,
  });

  const createdPub = await pub.findById({_id : result._id}).populate("user")
  res
    .status(201)
    .json({ success: true, message: "Created successfull", pub: createdPub });
};

//upload created pub assets
const uploadCreatedPubAssets = async (req, res) => {
  const assets = await req.files;
  console.log("ASSETS : ", assets);
  res.status(201).json({
    success: true,
    message: "file uploaded successfull",
    isUpload: true,
  });
};

//GET A PUBLICATION
const getPub = async (req, res) => {
  const data = await pub.find().populate("user").sort({ createdAt: "desc" }).populate("user");
  res.status(200).json({ publication: data });
};

const getAllPubs = async (req, res) => {
  try {
    const data = await pub.find().sort({ createdAt: "desc" }).populate("user");
    res.status(200).json({ pubs: data });
  } catch (error) {
    console.error("Error reading directories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DOWNLOAD FILE FROM BACK
const downloadFile = (req, res) => {
  const { publicationId, fileName } = req.params;
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    publicationId,
    fileName
  );

  // Read the binary data from the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Convert binary data to Base64-encoded string
    const base64Image = Buffer.from(data).toString("base64");
    const imageSrc = `data:image/jpg;base64,${base64Image}`;

    // Send the image data in the response
    res.send(imageSrc);
  });
};

//REACT TO A PUB
const reagir = async (req, res) => {
  const { publication_id , content , action } = req.body;
  if (action == "add") {
    const react = await reaction.create({user : content});
    const publication = await pub.findByIdAndUpdate(publication_id, {
      $push: { reaction: react },
    });
    res.status(201).json({ success: true, react : react });
  } else if(action == "delete") {
    const react = await reaction.findById({_id : content});
    const publication = await pub.findByIdAndUpdate(publication_id, {
      $pull: { reaction : react._id },
    });
    const deleteReaction = await reaction.deleteOne(react)
    res.status(201).json({ success: true, pub : deleteReaction });
  }
};

//ADD COMMENTS
const commentaire = async (req, res) => {
  const { text, publication, user } = req.body;
  try {
    const comment = await coms.create({
      user,
      text,
    });
    //update the pub
    const newPub = await pub.findByIdAndUpdate(publication, {
      $push: { comment: comment },
    });

    const com = await coms.findById({ _id: comment._id }).populate("user");
    res.status(201).json({
      success: true,
      comment: { ...newPub, comment: com },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//LIST ALL PUB COMS
const listeComs = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await pub
      .findById({ _id: id })
      .populate({
        path: "comment",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "user",
          model: "User",
        },
      })
      .sort({ createdAt: "desc" });
    res.status(200).json({ comments: publication.comment, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

//CREATE ALERT
const createAlert = async (req, res) => {
  const cheminFichier = req.file && req.file.path;
  const { title } = req.body;
  const alert = await event.create({ title, path: cheminFichier });
  res.status(201).json({
    success: true,
    message: "pub of event is successfullity :)",
    alert: alert,
  });
};

//NOTIFY
const notification = async (req, res) => {
  const notif = await Notification.create(req.body);
  res.status(201).json({
    success: true,
    message: "notification successfullity :)",
    notif: notif,
  });
};

//CHECK IF THE USER HAS REACT OR NOT INTO A PUB

const checkIfUserHasReactOrNot = async (req, res) => {
  try {
    const { user_id, pub_id } = req.params;
    const publication = await pub.findById({ _id: pub_id }).populate("reaction");
    const reaction = publication.reaction.find(item => item.user == user_id)

    console.log("PUB :", user_id, pub_id);

    if (reaction) {
      res.status(200).json({ success: true, hasReact: true , react_id : reaction._id});
    } else {
      res.status(200).json({ success: true, hasReact: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
module.exports = {
  checkIfUserHasReactOrNot,
  createPub,
  uploadCreatedPubAssets,
  reagir,
  downloadFile,
  commentaire,
  createAlert,
  notification,
  getPub,
  getAllPubs,
  listeComs,
};
