import GameState from './GameState';

describe('GameState', () => {
  let game: GameState;
  beforeEach(() => {
    game = new GameState({ code: '0123' });
  });
  it('should allow to create a new game', () => {
    expect(game).toBeTruthy();
  });
  it('should throw error if code is not a 4 digit number', () => {
    expect(() => new GameState({ code: '012345' })).toThrow();
    expect(() => new GameState({ code: '012' })).toThrow();
  });
  it('should throw error if code is an invalid character', () => {
    expect(() => new GameState({ code: 'a123' })).toThrow();
  });
  it('should set turn by default to 8 turns', () => {
    expect(game.maxTurns).toStrictEqual(8);
  });
  it('should be on the step 0 when it begins', () => {
    expect(game.activeTurn).toStrictEqual(0);
  });
  it('should be allow to guess and return feed correctly when guess correctly', () => {
    const turn = game.guess('0123');
    expect(turn.feedback).toBe('RRRR');
  });
  it('should increment active turns on guess', () => {
    game.guess('1000');
    game.guess('1000');
    expect(game.activeTurn).toStrictEqual(2);
  });
  it('should know what previous guesses where', () => {
    game.guess('1001');
    game.guess('1002');
    expect(game.turns[0].guess).toStrictEqual('1001');
    expect(game.turns[1].guess).toStrictEqual('1002');
  });
  it('should generate correct feedback', () => {
    let turn = game.guess('5000');
    expect(turn.feedback).toStrictEqual('W');
    turn = game.guess('0321');
    expect(turn.feedback).toStrictEqual('RRWW');
    turn = game.guess('3210');
    expect(turn.feedback).toStrictEqual('WWWW');
    expect(game.activeTurn).toStrictEqual(3);
    game = new GameState({ code: '0011' });
    expect(game.guess('1100').feedback).toStrictEqual('WWWW');
    game = new GameState({ code: '0001' });
    expect(game.guess('1000').feedback).toStrictEqual('RRWW');
  });
  it('should finish the game after all turns have passed', () => {
    [0, 1, 2, 3, 4, 5, 6, 7].forEach(() => game.guess('0000'));
    expect(game.isOver()).toBeTruthy();
  });
  it('should not finish the game early', () => {
    game.guess('1111');
    expect(game.isOver()).toBeFalsy();
  });
  it('should finish the game after correct guess', () => {
    game.guess('0123');
    expect(game.isOver()).toBeTruthy();
    expect(game.isCodeGuessed()).toBeTruthy();
  });
});
