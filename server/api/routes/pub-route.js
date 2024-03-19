/** @format */

const {
  createPub,
  reagir,
  commentaire,
  createAlert,
  notification,
  getPub,
  listeComs,
  uploadCreatedPubAssets,
  getAllPubs,
  downloadFile,
  checkIfUserHasReactOrNot,
} = require("../controllers/pub-controller");
const router = require("express").Router();
const upload = require("../middleware/uploads");

router.post("/create-pub", createPub);

//ito le requetes
router.post("/upload-created-pub-assets" , upload.array("files",12),uploadCreatedPubAssets)
router.get("/get-pub", getPub);
router.get('/pubs/:publicationId/images/:fileName',downloadFile);
router.get("/get-all-pubs",getAllPubs)
router.post("/reagir", reagir);
router.post("/commentaire", commentaire);
router.post("/evenement", upload.single("cheminFichier"), createAlert);
router.post("/notification", notification);
router.get("/pub-commentaire/:id",listeComs)
router.get("/check-reaction/:user_id/:pub_id" , checkIfUserHasReactOrNot)

module.exports = router;
