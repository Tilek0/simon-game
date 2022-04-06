<template>
  <div>
    <h2 class="text" v-show="GET_MESSAGE.length">{{GET_MESSAGE}}</h2>
    <div class="game">
      <div
          v-for="item in GET_SECTIONS"
          :key="item.id"
          class="game-section"
          :class="{active: item.isHighlighted}"
          @click="userSelected(item.id)"
      ></div>
      <div class="game-button">
        <button @click="startGame">{{ buttonText }}</button>
        <div
            v-for="level in GET_DEFAULT_LEVEL"
            :key="level"
            @click="changeLevel(level)"
            :class="{activeLevel: level === GET_LEVEL}"
        >{{ level }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex/dist/vuex.mjs";
import audio_0 from "@/assets/sounds/0.ogg";
import audio_1 from "@/assets/sounds/1.ogg";
import audio_2 from "@/assets/sounds/2.ogg";
import audio_3 from "@/assets/sounds/3.ogg";
export default {
  name: "main-page",
  data: () => ({
    audios: [
      audio_0,
      audio_1,
      audio_2,
      audio_3
    ],
  }),
  computed: {
    ...mapGetters([
      'GET_SECTIONS',
      'GET_MESSAGE',
      'GET_LEVEL',
      'GET_DEFAULT_LEVEL',
      'GET_GAME_ON',
      'GET_ROUND_NUMBER',
      'GET_IS_START',
      'GET_IS_USER_FAIL',
      'GET_IS_HIGHLIGHTING',
      'GET_SEQUENCE',
      'GET_USER_SEQUENCE',

    ]),
    buttonText() {
      if (!this.GET_GAME_ON) {
        return 'start';
      }
      return 'restart';
    },
    timeout() {
      switch(this.GET_LEVEL) {
        case 'easy': return 1.5;
        case 'medium': return 1;
        case 'hard': return 0.4;
        default: return 1.5;
      }
    },
  },
  methods: {
    ...mapActions([
        'SET_RANDOM_NUMBER',
        'CHANGE_MESSAGE',
        'CLEAR_USER_SEQUENCE',
        'CLEAR_GAME_SEQUENCE',
        'SWITCH_GAME',
        'CHANGE_IS_USER_FAIL',
        'START_ROUND_NUMBER',
        'CHANGE_LEVEL',
        'SET_SECTION_HIGHLIGHT',
        'CHANGE_IS_HIGHLIGHTING',
        'SET_WIN_HIGHLIGHT',
        'SET_NEXT_ROUND_NUMBER',
        'SET_USER_SELECTED',
    ]),
    playAudio(index) {
      const audio = new Audio(this.audios[index]);
      audio.play();
    },
    startGame() {
      this.CLEAR_USER_SEQUENCE();
      this.CLEAR_GAME_SEQUENCE();
      this.SWITCH_GAME(true);
      this.CHANGE_IS_USER_FAIL(false);
      this.START_ROUND_NUMBER(1);
      this.SET_RANDOM_NUMBER();
      this.highlightSections();
      this.CHANGE_MESSAGE('game started!');
    },
    changeLevel(level) {
      this.CHANGE_LEVEL(level);
      this.CLEAR_USER_SEQUENCE();
      if (this.GET_GAME_ON && !this.GET_IS_HIGHLIGHTING) this.highlightSections();
    },
    highlightOne(value) {
      this.GET_SECTIONS.forEach(section => {
        if (section.id === value) {
          let data = {
            id: section.id,
            boolean: true,
          }
          this.SET_SECTION_HIGHLIGHT(data);
          this.playAudio(data.id);
          setTimeout(() => {
            data.boolean = false;
            this.SET_SECTION_HIGHLIGHT(data);
          }, this.timeout / 2 * 1000);
        } else {
          let data = {
            id: section.id,
            boolean: false,
          }
          this.SET_SECTION_HIGHLIGHT(data);
        }
      })
    },
    highlightSections() {
      this.CHANGE_IS_HIGHLIGHTING(true);
      this.GET_SEQUENCE.forEach((number, index) => {
        setTimeout(() => {
          this.highlightOne(number)
        }, this.timeout * 1000 * (index + 1))
      })
      setTimeout(() => {
        this.CHANGE_IS_HIGHLIGHTING(false);
      }, this.timeout * 1000 * (this.GET_SEQUENCE.length + 0.6))
    },
    setIsUserFail(itemId) {
      if (this.GET_SEQUENCE[this.GET_USER_SEQUENCE.length - 1] !== itemId) {
        this.CHANGE_IS_USER_FAIL(true);
        this.SWITCH_GAME(false);
        this.CLEAR_GAME_SEQUENCE();
        this.CLEAR_USER_SEQUENCE();
        this.START_ROUND_NUMBER(0);
        this.CHANGE_MESSAGE("You lose.");
        this.SET_WIN_HIGHLIGHT();
      }
    },
    userSelected(id) {
      if (this.GET_IS_HIGHLIGHTING) return;
      this.playAudio(id);
      if(!this.GET_GAME_ON) return;
      this.SET_USER_SELECTED(id);
      let data = {
        id: id,
        boolean: true,
      };
      this.SET_SECTION_HIGHLIGHT(data);
      setTimeout( () => {
        data.boolean = false;
        this.SET_SECTION_HIGHLIGHT(data);
      }, 200)
      this.setIsUserFail(id);
      if (!this.GET_IS_USER_FAIL &&
          this.GET_SEQUENCE.length === this.GET_USER_SEQUENCE.length) {
        setTimeout(() => {
          this.startNextRound();
        }, 500)
      }
    },
    startNextRound() {
      if (this.GET_ROUND_NUMBER <= 9) {
        this.CLEAR_USER_SEQUENCE();
        this.SET_NEXT_ROUND_NUMBER();
        this.SET_RANDOM_NUMBER();
        this.highlightSections();
        this.CHANGE_MESSAGE(`Round ${this.GET_ROUND_NUMBER}`);
      } else {
        this.SWITCH_GAME(false);
        this.SET_WIN_HIGHLIGHT();
        this.CHANGE_MESSAGE("You won!");
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.text {
  color: red;
}
.game {
  width: 50vh;
  height: 50vh;
  margin: 5% auto;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  .active {
    opacity: 0.3;
  }
  &-button {
    position: absolute;
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
    border-radius: 50%;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    button {
      padding: 5%;
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 8%;
    }
    .activeLevel {
      padding: 2% 7%;
      color: black;
      background: white;
    }
  }
  &-section {
    width: 45%;
    height: 45%;
    transition: 0.25s;
    position: absolute;
    border: 5px solid black;
    &:nth-child(1) {
      top: 0;
      left: 0;
      margin-right: 10px;
      margin-bottom: 10px;
      background: red;
    }
    &:nth-child(2) {
      top: 0;
      right: 0;
      margin-left: 10px;
      margin-bottom: 10px;
      background: blue;
    }
    &:nth-child(3) {
      bottom: 0;
      left: 0;
      margin-right: 10px;
      margin-top: 10px;
      background: green;
    }
    &:nth-child(4) {
      bottom: 0;
      right: 0;
      margin-left: 10px;
      margin-top: 10px;
      background: yellow;
    }
  }
}
@media (max-width: 430px) {
  .game {
    width: 40vh;
    height: 40vh;
  }
}
</style>