import Turn from './Turn';
import Feedback from './Feedback';

export default class GameState {
  protected code: string[];
  public maxTurns: number;
  public activeTurn: number = 0;
  public turns: Turn[] = [];

  constructor({ code, maxTurns = 8 }: { code: string; maxTurns?: number }) {
    if (this.isCodeValid(code)) throw new Error('Invalid code');
    this.turns = new Array(maxTurns);
    this.code = code.split('');
    this.maxTurns = maxTurns;
  }

  private isCodeValid(code: string) {
    const regex = RegExp(/^[0-5]{4}$/);
    return !regex.test(code);
  }

  private areTurnsOver() {
    return this.activeTurn + 1 >= this.maxTurns;
  }

  isCodeGuessed() {
    return (
      this.turns.findIndex((t) => (t ? t.feedback === 'RRRR' : false)) >= 0
    );
  }

  guess(guess: string): Turn {
    if (this.isCodeValid(guess)) throw new Error('Invalid code');
    const feedback = new Feedback({
      guess: guess.split(''),
      code: this.code,
    }).getFeedback();
    const turn = new Turn({ guess: guess, feedback });
    this.turns[this.activeTurn++] = turn;
    return turn;
  }

  isOver() {
    return this.isCodeGuessed() || this.areTurnsOver();
  }
}
