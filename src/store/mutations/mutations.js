export default {
    ADD_RANDOM_NUMBER(state) {
        state.sequenceArr.push(Math.floor(Math.random() * 3) + 1);
    },
    SET_IS_GAME_ON(state, boolean) {
        state.isGameOn = boolean;
    },
    SET_MESSAGE(state, text) {
        state.message = text;
    },
    SET_LEVEL(state, level) {
        state.level = level;
    },
    SET_IS_USER_FAIL(state, boolean) {
        state.isUserFail = boolean;
    },
    SET_IS_HIGHLIGHTING(state, boolean) {
        state.isHighlighting = boolean;
    },
    TRASH_USER_SEQUENCE(state) {
        state.userSequence = [];
    },
    TRASH_GAME_SEQUENCE(state) {
        state.sequenceArr = [];
    },
    CHANGE_SECTION_HIGHLIGHT(state, data) {
        state.sections[data.id].isHighlighted = data.boolean;
    },
    PUSH_USER_SELECTED(state, value) {
        state.userSequence.push(value);
    },
    INCREMENT_ROUND_NUMBER(state) {
        state.roundNumber++;
    },
    ADD_ROUND_NUMBER(state, number) {
        state.roundNumber = number;
    },
    FINNISH(state) {
        state.sections.forEach(item => item.isHighlighted = true);
    }
}