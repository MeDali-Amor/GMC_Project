const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

const {
    gettest,
    allTopics,
    mostRecommendedTopics,
    mostRecentTopics,
    getOneTopic,
    userTopics,
    currentUserTopics,
    timelineTopics,
    createTopic,
    searchTopic,
    recommendTopic,
    commentTopic,
    deleteTopic,
    getTopicImg,
} = require("../controllers/topic.controllers");
const isAuth = require("../middlewear/isAuth");
const {
    searchValidator,
    validation,
} = require("../middlewear/searchValidator");
const { commentValidator } = require("../middlewear/topicValidator");

//
router.get("/", allTopics);
router.get("/recommended", mostRecommendedTopics);
router.get("/recent", mostRecentTopics);
router.get("/one_topic/:topic_id", getOneTopic);
router.get("/user_topics/:user_id", userTopics);
router.get("/current", isAuth, currentUserTopics);
router.get("/timeline_topics", isAuth, timelineTopics);
router.get("/img/:topicId", getTopicImg);
router.post("/create_topic", isAuth, formidable(), createTopic);
router.put("/search_topic", searchValidator(), validation, searchTopic);
// router.put("/recommend/:topic_id", isAuth, recommendTopic);
router.put("/recommend/:topicId", isAuth, recommendTopic);
router.put(
    "/comment/:topic_id",
    isAuth,
    commentValidator(),
    validation,
    commentTopic
);
router.delete("/delete/:topic_id", isAuth, deleteTopic);
module.exports = router;
