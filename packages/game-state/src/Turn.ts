export default class Turn {
  public guess: string;
  public feedback: string;

  constructor({ guess, feedback }: { guess: string; feedback: string }) {
    this.guess = guess;
    this.feedback = feedback;
  }
}
