const Video = require('../Schemas/Video')

const getAllVideos = async (req, res) => {
    const videos = await Video.find()
        .populate("user", "name")
        .populate("category", "name")
    try {
        return res.status(200).json(videos)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get videos"})
    }
}

const getOneVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id)
        .populate("user", "name")
        .populate("category", "name")
    try {
        return res.status(200).json(video)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get the video"})       
    }
}

const createVideo = async (req, res) => {
    const video = await Video.create(req.body);
    try {
        return res.status(201).json(video)
    } catch (error) {
        return res.status(500).json({message: "Couldn't create video"})
    }
}

const updateVideo = async (req, res) => {
    const { id } = req.params;
    const videoToUpdate = await Video.findByIdAndUpdate(id, req.body, {new:true})
    try {
        return res.status(202).json(videoToUpdate)
    } catch (error) {
        return res.status(500).json({message: "Couldn't update the video"})
    }
}

const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id)
    try {
        return res.status(202).json({message: "Video deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "Couldn't delete video"})
    }
}


module.exports = {
    getAllVideos,
    getOneVideo,
    createVideo,
    updateVideo,
    deleteVideo
}