import axios from "axios";
import {
    COMMENT_TOPIC,
    CREATE_TOPIC,
    CURRENT_USER_TOPICS,
    DELETE_TOPIC,
    FAIL_TOPIC,
    GET_ALL_TOPICS,
    GET_USER_TOPICS,
    RECENT_TOPICS,
    RECOMMENDED_TOPIC,
    RECOMMEND_TOPIC,
    SEARCH_TOPICS,
    TIMILINE_TOPICS,
    LOAD_TOPIC,
} from "../constantes/topic";

export const createTopic = (topicData) => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.post(
            "/api/topic/create_topic",
            topicData,
            config
        );
        dispatch({ type: CREATE_TOPIC, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export const getAllTopics = () => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });

    try {
        let result = await axios.get("/api/topic/");
        dispatch({ type: GET_ALL_TOPICS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export const getUserTopics = (user_id) => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });

    try {
        let result = await axios.get(`/api/topic/user_topics/${user_id}`);
        dispatch({ type: GET_USER_TOPICS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export let timelineTopics = () => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });

    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.get("/api/topic/timeline_topics", config);
        dispatch({ type: TIMILINE_TOPICS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export const currentUserTopics = () => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });

    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.get("/api/topic/current", config);
        dispatch({ type: CURRENT_USER_TOPICS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};
export const getOneTopic = (topic_id) => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });
    try {
        let result = await axios.get(`/api/topic/one_topic/${topic_id}`);
        dispatch({ type: CURRENT_USER_TOPICS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};
export const searchTopics = (searchInput) => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });

    try {
        let result = await axios.put("/api/topic/search_topic", searchInput);
        dispatch({ type: SEARCH_TOPICS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};
export const recentTopic = () => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });

    try {
        let result = await axios.get("/api/topic/recent");
        dispatch({ type: RECENT_TOPICS, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export const recommendedTopic = () => async (dispatch) => {
    dispatch({ type: LOAD_TOPIC });
    try {
        let result = await axios.get("/api/topic/recommended");
        dispatch({ type: RECOMMENDED_TOPIC, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export const commentTopic = (commentInput, topic_id) => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.put(
            `/api/topic/comment/${topic_id}`,
            commentInput,
            config
        );
        dispatch({ type: COMMENT_TOPIC });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export const recommendTopic = (user_id, topicId) => async (dispatch) => {
    // dispatch({ type: LOAD_TOPIC });
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.put(
            `/api/topic/recommend/${topicId}`,
            user_id,
            config
        );
        dispatch({ type: RECOMMEND_TOPIC, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};

export const deleteTopic = (topic_id) => async (dispatch) => {
    try {
        const config = {
            headers: { authorization: localStorage.getItem("token") },
        };
        let result = await axios.delete(
            `/api/topic/delete/${topic_id}`,
            config
        );
        dispatch({ type: DELETE_TOPIC });
    } catch (error) {
        dispatch({ type: FAIL_TOPIC, payload: error.response.data });
    }
};
