export default {
    GET_SECTIONS(state) {
        return state.sections;
    },
    GET_LEVEL(state) {
        return state.level;
    },
    GET_DEFAULT_LEVEL(state) {
        return state.defaultLevel;
    },
    GET_GAME_ON(state) {
        return state.isGameOn;
    },
    GET_ROUND_NUMBER(state) {
        return state.roundNumber;
    },
    GET_IS_START(state) {
        return state.isStart;
    },
    GET_IS_USER_FAIL(state) {
        return state.isUserFail;
    },
    GET_IS_HIGHLIGHTING(state) {
        return state.isHighlighting;
    },
    GET_MESSAGE(state) {
        return state.message;
    },
    GET_SEQUENCE(state) {
        return state.sequenceArr;
    },
    GET_USER_SEQUENCE(state) {
        return state.userSequence;
    },
}