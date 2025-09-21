import { test, expect } from '@playwright/test';

test.describe('Warmup Math Game', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the game
    await page.goto('/');
  });


  test('user enters wrong answer - shows [X]', async ({ page }) => {
    // Start with known settings: subtract 1
    await page.locator('#difficulty').evaluate((el) => el.value = '1');
    await page.locator('#subtract-btn').click();
    await page.locator('#timeLimit').evaluate((el) => el.value = '10');

    // Start game
    await page.locator('#start-stop-btn').click();

    // Wait for challenges to be ready
    await page.waitForSelector('.challenge-input.current:not([disabled])');

    // Get the first challenge number
    const firstChallengeNumber = await page.locator('.challenge-number').first().textContent();
    const num = parseInt(firstChallengeNumber);

    // Calculate correct answer and enter wrong one
    const correctAnswer = (num - 1 + 10) % 10;
    const wrongAnswer = (correctAnswer + 1) % 10;

    // Enter wrong answer
    await page.locator('.challenge-input.current').fill(wrongAnswer.toString());

    // Check that input shows [X]
    await expect(page.locator('.challenge-input').first()).toHaveValue('[X]');
  });

  test('user inputs correct answer - shows as correct', async ({ page }) => {
    // Start with known settings: subtract 1
    await page.locator('#difficulty').evaluate((el) => el.value = '1');
    await page.locator('#subtract-btn').click();
    await page.locator('#timeLimit').evaluate((el) => el.value = '10');

    // Start game
    await page.locator('#start-stop-btn').click();

    // Wait for challenges to be ready
    await page.waitForSelector('.challenge-input.current:not([disabled])');

    // Get the first challenge number
    const firstChallengeNumber = await page.locator('.challenge-number').first().textContent();
    const num = parseInt(firstChallengeNumber);

    // Calculate correct answer: (num - 1) % 10, normalized to 0-9
    const correctAnswer = (num - 1 + 10) % 10;

    // Enter correct answer
    await page.locator('.challenge-input.current').fill(correctAnswer.toString());

    // Check that input is marked as correct
    await expect(page.locator('.challenge-input').first()).toHaveClass(/correct/);
  });

});
