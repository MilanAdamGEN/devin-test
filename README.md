# Stock Widget Chrome Extension

## Project Overview
This Chrome extension injects a stock market widget into every web page you visit. The widget displays a watchlist of stocks with real-time price updates, allowing users to track their favorite stocks while browsing the web.

## Features
- Floating stock widget that appears on every web page
- Real-time stock price updates (simulated for demo purposes)
- Add custom stock symbols to your watchlist
- Minimize/maximize widget for unobtrusive browsing
- Close widget when not needed
- Navigation controls for future feature expansion
- Responsive and modern UI design

## Technical Details
- Built with modern JavaScript
- Uses iframe injection for isolated widget environment
- Implements Manifest V3 specification for Chrome extensions
- Bundled with Webpack for optimized performance
- Includes testing setup with Jest
- Code quality maintained with ESLint

## Development
To work with this project:

```bash
# Install dependencies
npm install

# Development mode with watch
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Extension Structure
- `src/background.js`: Background service worker
- `src/content.js`: Content script that injects the widget iframe
- `src/widget.html`: HTML structure for the stock widget
- `src/widget.js`: JavaScript functionality for the stock widget
- `src/widget.css`: Styling for the stock widget
- `src/popup.js`: Controls the popup UI behavior
- `public/popup.html`: Popup interface markup
- `src/manifest.json`: Extension configuration

## Widget Features
- **Stock Watchlist**: Display stock symbols, company names, current prices, and price changes
- **Live Updates**: Simulated price changes every 10 seconds
- **Add Stocks**: Add new stock symbols to your watchlist
- **Widget Controls**: Minimize, maximize, or close the widget as needed
- **Navigation**: Previous/next buttons for future feature expansion

## License
MIT
