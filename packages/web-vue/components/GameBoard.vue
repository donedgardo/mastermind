<template>
  <div>
    <div v-for="(turn, i) in game.turns" className="turn" data-testid="turn" v-bind:key="'turn-' + i">
      <div>{{ `Turn  ${i + 1}` }}</div>
      <div v-if="turn && turn.guess" v-bind:data-testid="'guess-turn-'+ i">{{turn.guess }}</div>
      <div v-if="turn && turn.feedback" v-bind:data-testid="'feedback-turn-'+ i">{{turn.feedback }}</div>
    </div>
    <input data-testid="guess-0" v-model="guess0">
    <input data-testid="guess-1" v-model="guess1">
    <input data-testid="guess-2" v-model="guess2">
    <input data-testid="guess-3" v-model="guess3">
    <button data-testid="guess-button" v-bind:disabled="isSubmitDisabled" @click="submitGuess">Guess</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GameState from "@mastermind/game-state"

const game = new GameState({code: "1111"});
@Component
export default class GameBoard extends Vue{
  private game: GameState = game;
  private guess0: string = "";
  private guess1: string = "";
  private guess2: string = "";
  private guess3: string = "";

  private getGuessInput(): string {
      return this.guess0 + this.guess1 + this.guess2 + this.guess3
  }
  private isSubmitDisabled() {
      return this.game.isOver() || !this.game.isCodeValid(this.getGuessInput)
  }
  private resetInput() {
      this.guess0 = '';
      this.guess1 = '';
      this.guess2 = '';
      this.guess3 = '';
    },
  private submitGuess() {
      this.game.guess(this.getGuessInput())
      this.resetInput();
  }
}
</script>
