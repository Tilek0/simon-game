export default {
    SET_RANDOM_NUMBER({commit}) {
        commit('ADD_RANDOM_NUMBER');
    },
    SWITCH_GAME({commit}, boolean) {
        commit('SET_IS_GAME_ON', boolean);
    },
    CHANGE_MESSAGE({commit}, text) {
        commit('SET_MESSAGE', text);
    },
    CHANGE_LEVEL({commit}, level) {
        commit('SET_LEVEL', level);
    },
    CHANGE_IS_USER_FAIL({commit}, boolean) {
        commit('SET_IS_USER_FAIL', boolean);
    },
    CHANGE_IS_HIGHLIGHTING({commit}, boolean) {
        commit('SET_IS_HIGHLIGHTING', boolean);
    },
    CLEAR_USER_SEQUENCE({commit}) {
        commit('TRASH_USER_SEQUENCE');
    },
    CLEAR_GAME_SEQUENCE({commit}) {
        commit('TRASH_GAME_SEQUENCE');
    },
    SET_SECTION_HIGHLIGHT({commit}, data) {
        commit('CHANGE_SECTION_HIGHLIGHT', data);
    },
    SET_USER_SELECTED({commit}, value) {
        commit('PUSH_USER_SELECTED', value);
    },
    START_ROUND_NUMBER({commit}, number) {
        commit('ADD_ROUND_NUMBER', number);
    },
    SET_NEXT_ROUND_NUMBER({commit}) {
        commit('INCREMENT_ROUND_NUMBER');
    },
    SET_WIN_HIGHLIGHT({commit}) {
        commit('FINNISH')
    }
}