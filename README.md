# Warmup Math Game

A simple mental math game built as a Cloudflare Worker. Test your addition and subtraction skills with randomly generated challenges that increase in difficulty as you progress.

## Project Overview

This project is a single-page web application that serves as a mental math warmup game. Players are presented with random single-digit numbers and must add or subtract a specified amount within a time limit. The game progressively increases difficulty and alternates between addition and subtraction operations.

### Features

- **Progressive Difficulty**: Difficulty increases every 2 levels (1-9)
- **Alternating Operations**: Switches between addition and subtraction each level
- **Time Pressure**: Configurable time limits per challenge (1-10 seconds)
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Scoring**: Tracks current score and previous level performance
- **Visual Feedback**: Color-coded correct/incorrect answers

## Project Structure

```
warmup_worker/
├── src/
│   └── index.js          # Main Cloudflare Worker file containing HTML, CSS, and JS
├── package.json          # Node.js dependencies and scripts
├── wrangler.toml         # Cloudflare Worker configuration
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

### Key Files

- **`src/index.js`**: The main Cloudflare Worker that serves the entire application. It contains:
  - HTML structure for the game interface
  - CSS styles with responsive design and animations
  - JavaScript game logic and event handling

- **`wrangler.toml`**: Configuration file for Cloudflare Workers, specifying:
  - Worker name
  - Main script location
  - Compatibility settings (Node.js compatibility enabled)

- **`package.json`**: Defines project metadata and scripts:
  - `npm run dev`: Start local development server
  - `npm run deploy`: Deploy to Cloudflare

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Cloudflare account (for deployment)

## Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd warmup_worker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The game will be available at `http://localhost:8787`

4. **Make changes**
   - Edit `src/index.js` to modify the game logic, UI, or styles
   - The development server will automatically reload when you save changes

## Deployment

### Deploy to Cloudflare Workers

1. **Install Wrangler CLI** (if not already installed globally)
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate with Cloudflare**
   ```bash
   wrangler auth login
   ```

3. **Deploy the worker**
   ```bash
   npm run deploy
   ```

   This will build and deploy your worker to Cloudflare's edge network.

4. **Access your deployed application**
   After deployment, Wrangler will provide a URL like:
   `https://warmup-worker.<your-subdomain>.workers.dev`

### Custom Domain (Optional)

To use a custom domain:

1. **Configure your domain in Cloudflare**
   - Add your domain to Cloudflare
   - Update DNS settings

2. **Update wrangler.toml** (optional)
   - Add custom domain configuration if needed

3. **Deploy with custom domain**
   ```bash
   wrangler deploy
   ```

## Game Mechanics

### How to Play

1. **Configure Settings** (before starting):
   - **Amount**: Difficulty level (1-9) - number to add/subtract
   - **Operation**: Choose between Add or Subtract
   - **Time Limit**: Seconds per challenge (1-10 seconds)

2. **Start the Game**:
   - Click "Start Game" to begin
   - Settings panel hides, game interface appears

3. **Solve Challenges**:
   - 10 random single-digit numbers are generated
   - For each number, calculate: `number ± difficulty`
   - Enter your answer in the input field
   - Game moves automatically to next challenge

4. **Progression**:
   - Complete 10 challenges to finish a level
   - Difficulty increases every 2 levels
   - Operations alternate between add/subtract each level
   - Time limits decrease slightly each level

5. **Scoring**:
   - 1 point per correct answer
   - Maximum 10 points per level
   - Previous level scores are tracked and displayed

### Tips

- Start with lower difficulty (1-3) and longer time limits (8-10 seconds)
- Focus on the operation pattern rather than individual calculations
- The game gets progressively faster and more challenging

## Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing to ensure the math game works correctly across different browsers and devices.

### Test Setup

1. **Install Playwright browsers** (one-time setup):
   ```bash
   npm run test:install
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Run tests with browser UI** (for debugging):
   ```bash
   npm run test:headed
   ```

### Test Configuration

- **Test Directory**: `tests/` - All test files are stored here
- **Configuration**: `playwright.config.js` - Test settings and browser configurations
- **Automatic Server**: Tests automatically start the local dev server (`npm run dev`)
- **Multi-Browser**: Tests run on Chromium, Firefox, WebKit, and mobile viewports

### Test Coverage

The test suite covers:
- Game interface loading and initial state
- Game start/stop functionality
- Correct and incorrect answer handling
- Level completion and progression
- Score tracking and display
- Mobile responsiveness
- Settings panel behavior

### Deployment Safety

**Tests are completely excluded from deployment:**
- Test files (`tests/` directory) are not included in `wrangler.toml`
- Playwright is a dev dependency (`devDependencies` in `package.json`)
- Test artifacts are ignored in `.gitignore` (`test-results/`, `playwright-report/`)
- Only `src/index.js` gets deployed to Cloudflare Workers

## Development Notes

### Architecture

The entire application is contained in a single Cloudflare Worker file for simplicity:

- **HTML**: Game interface with settings, scores, and challenge display
- **CSS**: Responsive styling with mobile-first approach
- **JavaScript**: Game state management, logic, and DOM manipulation

### Browser Compatibility

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch-friendly interface for mobile devices

### Performance

- Served from Cloudflare's global edge network
- No external dependencies or assets
- Lightweight bundle (< 50KB gzipped)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Deploy to a test environment if needed
6. Submit a pull request

## License

This project is open source. Please check the license file for details.
