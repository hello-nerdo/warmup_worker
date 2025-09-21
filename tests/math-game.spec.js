import { test, expect } from '@playwright/test';

test.describe('Warmup Math Game', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the game
    await page.goto('/');
  });

  test('should load the game interface', async ({ page }) => {
    // Check that the main elements are present
    await expect(page.locator('.main')).toBeVisible();
    await expect(page.locator('.game-section')).toBeVisible();
    await expect(page.locator('.settings-panel')).toBeVisible();
    await expect(page.locator('.game-area')).toBeVisible();

    // Check settings panel elements
    await expect(page.locator('#difficulty')).toBeVisible();
    await expect(page.locator('#subtract-btn')).toBeVisible();
    await expect(page.locator('#add-btn')).toBeVisible();
    await expect(page.locator('#timeLimit')).toBeVisible();

    // Check game area
    await expect(page.locator('#start-stop-btn')).toHaveText('Start Game');
  });

  test('should start game and show challenges', async ({ page }) => {
    // Start the game
    await page.locator('#start-stop-btn').click();

    // Settings panel should be hidden
    await expect(page.locator('.settings-panel')).toHaveClass(/hidden/);

    // Scores section should be visible
    await expect(page.locator('.scores-section')).not.toHaveClass(/hidden/);

    // Current task should be visible
    await expect(page.locator('.current-task-container')).not.toHaveClass(/hidden/);

    // Challenges should be visible
    await expect(page.locator('#challenges')).toHaveClass(/visible/);

    // Should have 10 challenge inputs
    await expect(page.locator('.challenge')).toHaveCount(10);

    // Button should now say "Stop Game"
    await expect(page.locator('#start-stop-btn')).toHaveText('Stop Game');
  });

  test('should display correct current task information', async ({ page }) => {
    // Set specific settings
    await page.locator('#difficulty').fill('3');
    await page.locator('#add-btn').click();
    await page.locator('#timeLimit').fill('5.0');

    // Start game
    await page.locator('#start-stop-btn').click();

    // Wait for game to be running and challenges to be visible
    await page.waitForSelector('#challenges.visible');

    // Check that the task displays the correct information
    await expect(page.locator('.operation-badge')).toHaveText('add');
    await expect(page.locator('.amount-pill')).toHaveText('3');
    await expect(page.locator('.seconds-value')).toHaveText('5.0');
  });

  test('should handle correct and incorrect answers', async ({ page }) => {
    // Start with known settings: subtract 1
    await page.locator('#difficulty').fill('1');
    await page.locator('#subtract-btn').click();
    await page.locator('#timeLimit').fill('10');

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

    // Wait for the input to be marked as correct
    await expect(page.locator('.challenge-input').first()).toHaveClass(/correct/);

    // Score should be 1
    await expect(page.locator('#current-score')).toHaveText('1');
  });

  test('should handle incorrect answers', async ({ page }) => {
    // Start with known settings: subtract 1
    await page.locator('#difficulty').fill('1');
    await page.locator('#subtract-btn').click();

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

    // Should be marked as incorrect
    await expect(page.locator('.challenge-input').first()).toHaveClass(/incorrect/);

    // Score should still be 0
    await expect(page.locator('#current-score')).toHaveText('0');
  });

  test('should complete a level and show previous scores', async ({ page }) => {
    // Start with easy settings and long time
    await page.locator('#difficulty').fill('1');
    await page.locator('#subtract-btn').click();
    await page.locator('#timeLimit').fill('10');

    // Start game
    await page.locator('#start-stop-btn').click();

    // Wait for challenges to be ready
    await page.waitForSelector('.challenge-input.current:not([disabled])');

    // Complete all 10 challenges with correct answers
    for (let i = 0; i < 10; i++) {
      // Get the current challenge number (the one that's currently active)
      const currentChallengeNumber = await page.locator('.challenge-number').nth(i).textContent();
      const num = parseInt(currentChallengeNumber);

      // Calculate correct answer for subtract 1
      const correctAnswer = (num - 1 + 10) % 10;

      // Enter the answer in the current active input
      await page.locator('.challenge-input.current').fill(correctAnswer.toString());

      // Wait for processing and next challenge to become active
      if (i < 9) {
        await page.waitForSelector('.challenge-input.current:not([disabled])');
      }
      await page.waitForTimeout(100);
    }

    // Should have completed a level and show it in previous scores
    await expect(page.locator('.previous-score')).toHaveCount(1);
    await expect(page.locator('.previous-score').first()).toContainText('Level 1: 10 points');

    // Current score should be reset to 0
    await expect(page.locator('#current-score')).toHaveText('0');
  });

  test('should stop game and reload on stop button', async ({ page }) => {
    // Start game
    await page.locator('#start-stop-btn').click();

    // Click stop - this should reload the page
    await page.locator('#start-stop-btn').click();

    // Page should reload, so we should be back to initial state
    await expect(page.locator('#start-stop-btn')).toHaveText('Start Game');
    await expect(page.locator('.settings-panel')).not.toHaveClass(/hidden/);
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Should still load correctly
    await expect(page.locator('.main')).toBeVisible();

    // Start game
    await page.locator('#start-stop-btn').click();

    // Wait for challenges to be ready
    await page.waitForSelector('#challenges.visible');

    // Should work in mobile layout
    await expect(page.locator('#challenges')).toHaveClass(/visible/);
    await expect(page.locator('.challenge')).toHaveCount(10);
  });
});
