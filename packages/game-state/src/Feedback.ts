export default class Feedback {
  protected guess: string[];
  protected code: string[];
  protected ignore: string[] = [];

  constructor({ guess, code }: { guess: string[]; code: string[] }) {
    this.guess = guess;
    this.code = code;
  }

  public getFeedback() {
    const feedback: string[] = [];
    this.guess.forEach((letter, i) => {
      if (this.shouldGiveRedFeedback(i, letter)) {
        feedback.push('R');
      } else if (
        this.shouldGiveWhiteFeedback({ letter, ignore: this.ignore })
      ) {
        this.giveWhiteLetter(feedback, letter);
      }
    });
    return feedback.sort().join('');
  }

  private giveWhiteLetter(feedback: string[], letter: string) {
    feedback.push('W');
    if (this.code.filter((c) => c === letter).length === 1) {
      this.ignore.push(letter);
    }
  }

  private shouldGiveRedFeedback(i: number, letter: string) {
    return this.code[i] === letter;
  }

  private shouldGiveWhiteFeedback({
    letter,
    ignore,
  }: {
    letter: string;
    ignore: string[];
  }) {
    return this.code.includes(letter) && !ignore.includes(letter);
  }
}
