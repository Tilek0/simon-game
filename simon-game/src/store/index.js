import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters/getters";
import mutations from "@/store/mutations/mutations";
import actions from "@/store/actions/actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sections: [
      {
        id: 0,
        isHighlighted: false
      },
      {
        id: 1,
        isHighlighted: false
      },
      {
        id: 2,
        isHighlighted: false
      },
      {
        id: 3,
        isHighlighted: false
      },
    ],

    roundNumber: 0,
    defaultLevel: ['ease', 'medium', 'hard'],
    level: 'ease',
    isStart: false,
    isGameOn: false,
    isUserFail: false,
    isHighlighting: false,
    sequenceArr: [],
    userSequence: [],
    message: "Let's play",
  },
  getters,
  mutations,
  actions,
  modules: {
  }
})
