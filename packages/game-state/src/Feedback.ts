export default class Feedback {
  protected guess: string[];
  protected code: string[];
  protected ignore: string[] = [];
  protected feedback: string[] = [];
  protected codeLetterCount: any = {};

  constructor({ guess, code }: { guess: string[]; code: string[] }) {
    this.guess = guess;
    this.code = code;
    code.forEach(l =>  this.codeLetterCount[l] = this.code.filter(c => c === l).length)
  }

  public getFeedback() {
    this.setFeedback();
    return this.feedback.sort().join('');
  }

  private giveRedLetter(i: number, letter: string) {
    this.feedback.push('R');
    this.codeLetterCount[letter]--;
  }

  private shouldGiveRedFeedback(i: number, letter: string) {
    return this.code[i] === letter
  }

  private setFeedback() {
    this.setRedFeedback();
    this.setWhiteFeedback();
  }

  private setRedFeedback() {
    this.guess.forEach((letter, i) => {
      if (this.shouldGiveRedFeedback(i, letter)) {
        this.giveRedLetter(i, letter);
      }
    });
  }

  private setWhiteFeedback() {
    this.guess.forEach((letter, index) => {
      this.code.forEach((c, i) => {
        for (let l = 0; l < this.codeLetterCount[letter]; l++) {
          if (c === letter && !this.shouldGiveRedFeedback(index, letter)) {
            this.giveWhiteFeedback(letter);
          }
        }
      })
    });
  }

  private giveWhiteFeedback(letter: string) {
    this.feedback.push('W');
    this.codeLetterCount[letter]--;
  }
}
