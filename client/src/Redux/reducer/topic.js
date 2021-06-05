import {
    COMMENT_TOPIC,
    CREATE_TOPIC,
    CURRENT_USER_TOPICS,
    DELETE_TOPIC,
    FAIL_TOPIC,
    GET_ALL_TOPICS,
    GET_ONE_TOPIC,
    GET_USER_TOPICS,
    RECENT_TOPICS,
    RECOMMENDED_TOPIC,
    RECOMMEND_TOPIC,
    SEARCH_TOPICS,
    TIMILINE_TOPICS,
    LOAD_TOPIC,
} from "../constantes/topic";

// initial state
const initialstate = {
    topics: [],
    results: [],
    topic: null,
    errors: null,
    load: false,
};

// pure function
const topicReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case LOAD_TOPIC:
            return { ...state, load: true };
        case CREATE_TOPIC:
            return { ...state, topic: payload.topic, load: false };
        case GET_ONE_TOPIC:
            return { ...state, topic: payload, load: false };
        case DELETE_TOPIC:
            return { ...state, topic: payload.topic, load: false };
        case GET_USER_TOPICS:
            return { ...state, topics: payload, load: false };
        case GET_ALL_TOPICS:
            return { ...state, topics: payload, load: false };
        case CURRENT_USER_TOPICS:
            return { ...state, topics: payload, load: false };
        case TIMILINE_TOPICS:
            return { ...state, topics: payload, load: false };
        case SEARCH_TOPICS:
            return { ...state, results: payload, load: false };
        case RECENT_TOPICS:
            return { ...state, topics: payload, load: false };
        case RECOMMENDED_TOPIC:
            return { ...state, topics: payload, load: false };
        case RECOMMEND_TOPIC:
            return { ...state, topic: payload.topic, load: false };
        case DELETE_TOPIC:
            return { ...state, load: false };
        case COMMENT_TOPIC:
            return { ...state, load: false };
        case FAIL_TOPIC:
            return { ...state, errors: payload, load: true };

        default:
            return state;
    }
};

export default topicReducer;
