import { render, fireEvent, ComponentHarness } from '@testing-library/vue';
import '@testing-library/jest-dom'
import GameBoard from '@/components/GameBoard.vue'

function getGuessSubmitButton(gameBoard: ComponentHarness) {
  return gameBoard.getByTestId('guess-button');
}

function submitGuess(gameBoard: ComponentHarness, i: number, c: string) {
  return fireEvent.update(gameBoard.getByTestId(`guess-${i}`), c);
}

async function crackCode(gameBoard: ComponentHarness, code: string) {
  const updateInput = code.split("").map((c, i) => {
    return submitGuess(gameBoard, i, c);
  })
  await Promise.all(updateInput)
  await fireEvent.click(getGuessSubmitButton(gameBoard))
}

async function inputGuess(gameBoard: ComponentHarness, code: string,) {
  await Promise.all(code.split('').map((c, i) => {
    return submitGuess(gameBoard, i, c);
  }));
}

async function guess(gameBoard: ComponentHarness, code: string) {
  if(!code) return
  await inputGuess(gameBoard, code);
  await fireEvent.click(getGuessSubmitButton(gameBoard))
}

describe('GameBoard', () => {
  const code = "0123"
  let gameBoard: ComponentHarness;

  beforeEach(() => {
    gameBoard = render(GameBoard);
  })

  test('should show 8 empty turns', () => {
    const { getAllByTestId } = gameBoard;
    expect(getAllByTestId("turn").length).toStrictEqual(8)
  })
  test("should allow player to guess for code break", async () => {
    const submitButton = getGuessSubmitButton(gameBoard)
    expect(submitButton).toBeDisabled();
    await crackCode(gameBoard, code);
    expect(submitButton).toBeDisabled();
  })
  test("should clear inputs after guessing", async () => {
    await guess(gameBoard, "0000");
    const submitButton = getGuessSubmitButton(gameBoard)
    expect(submitButton).toBeDisabled();
  })
  test("show show previous guess results", async() => {
    const { getByTestId } = gameBoard;
    await crackCode(gameBoard, code)
    const lastFeedback = await getByTestId('feedback-turn-0')
    expect(lastFeedback).toBeInTheDocument()
  })
  test("button should be disabled if code is not valid", async () => {
    const { getByTestId } = gameBoard;
    await inputGuess(gameBoard, "012")
    expect(getGuessSubmitButton(gameBoard)).not.toBeDisabled()

  })

})
