const express = require('express');
const router = express.Router();
const { 
        getAllVideos, 
        getOneVideo, 
        createVideo, 
        updateVideo, 
        deleteVideo 
    } = require('../controllers/videoContoller');



router.get("/", getAllVideos);
router.get("/video/:id", getOneVideo);
router.post("/video", createVideo);
router.put("/video/:id", updateVideo);
router.delete("/video/:id", deleteVideo);

module.exports = router;