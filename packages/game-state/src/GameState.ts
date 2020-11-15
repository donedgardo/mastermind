import Turn from './Turn';
import Feedback from './Feedback';

export default class GameState {
  protected code: string[];
  public maxTurns: number;
  public activeTurn: number = 0;
  public turns: Turn[] = [];

  constructor(args: { code?: string; maxTurns?: number } = {}) {
    const { code = "", maxTurns = 8} = args
    if(!code) this.code = [0,0,0,0].map(()=>Math.floor(Math.random() * 6).toString());
    else {
      if (!this.isCodeValid(code)) throw new Error('Invalid code')
      this.code = code.split('');
    }
    this.turns = new Array(maxTurns);
    this.maxTurns = maxTurns;
  }

  public isCodeValid(code: string) {
    const regex = RegExp(/^[0-5]{4}$/);
    return regex.test(code);
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
    if (!this.isCodeValid(guess)) throw new Error('Invalid code');
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

  getCode(): string|null {
    if (this.isOver()) return this.code.join()
    return null;
  }
}
