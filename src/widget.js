// Sample stock data (in a real app, this would come from an API)
let stockData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 1.25 },
  { symbol: 'MSFT', name: 'Microsoft', price: 420.45, change: 2.78 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 177.85, change: -0.53 }
];

// Default update interval (10 seconds)
let updateInterval = 10000;
let updateIntervalId = null;

// Function to create a stock item element
function createStockItem(stock) {
  const stockItem = document.createElement('div');
  stockItem.className = 'stock-item';
  
  const isPositive = stock.change >= 0;
  const changeClass = isPositive ? 'positive' : 'negative';
  const triangleClass = isPositive ? 'triangle-up' : 'triangle-down';
  
  stockItem.innerHTML = `
    <div class="stock-info">
      <div class="stock-symbol">${stock.symbol}</div>
      <div class="stock-name">${stock.name}</div>
    </div>
    <div class="stock-price-info">
      <div class="stock-price">$${stock.price.toFixed(2)}</div>
      <div class="stock-change ${changeClass}">
        <div class="${triangleClass}"></div>
        ${Math.abs(stock.change).toFixed(2)}
      </div>
    </div>
  `;
  
  return stockItem;
}

// Function to render all stocks
function renderStocks() {
  const container = document.querySelector('.stocks-container');
  container.innerHTML = '';
  
  stockData.forEach(stock => {
    container.appendChild(createStockItem(stock));
  });
  
  // Save stock data to local storage
  saveStockData();
}

// Function to save stock data to local storage
function saveStockData() {
  // In a real extension, we would use chrome.storage.local
  // For this demo, we'll use localStorage in the iframe
  localStorage.setItem('stockData', JSON.stringify(stockData));
}

// Function to load stock data from local storage
function loadStockData() {
  const savedData = localStorage.getItem('stockData');
  if (savedData) {
    try {
      stockData = JSON.parse(savedData);
    } catch (e) {
      console.error('Error parsing saved stock data:', e);
    }
  }
}

// Function to add a new stock
function addStock(symbol) {
  if (!symbol) return;
  
  // Check if stock already exists
  if (stockData.some(stock => stock.symbol === symbol)) {
    alert('This stock is already in your watchlist');
    return;
  }
  
  // In a real app, you would fetch the stock data from an API
  // For this demo, we'll generate random data
  const randomPrice = (Math.random() * 500 + 50).toFixed(2);
  const randomChange = (Math.random() * 5 - 2.5).toFixed(2);
  
  const newStock = {
    symbol: symbol,
    name: `${symbol} Corp.`,
    price: parseFloat(randomPrice),
    change: parseFloat(randomChange)
  };
  
  stockData.push(newStock);
  renderStocks();
}

// Function to update stock prices
function updateStockPrices() {
  stockData = stockData.map(stock => {
    const randomChange = (Math.random() * 2 - 1).toFixed(2);
    const newPrice = (stock.price + parseFloat(randomChange)).toFixed(2);
    return {
      ...stock,
      price: parseFloat(newPrice),
      change: parseFloat(randomChange)
    };
  });
  renderStocks();
}

// Function to start the update interval
function startUpdateInterval() {
  // Clear any existing interval
  if (updateIntervalId) {
    clearInterval(updateIntervalId);
  }
  
  // Start a new interval
  updateIntervalId = setInterval(updateStockPrices, updateInterval);
}

// Initialize the widget
document.addEventListener('DOMContentLoaded', () => {
  // Load saved stock data
  loadStockData();
  
  // Render initial stocks
  renderStocks();
  
  // Add stock form handling
  const addStockForm = document.querySelector('.add-stock-form');
  const addStockInput = document.querySelector('.add-stock-input');
  const addStockButton = document.querySelector('.add-stock-button');
  
  addStockButton.addEventListener('click', () => {
    const symbol = addStockInput.value.trim().toUpperCase();
    addStock(symbol);
    addStockInput.value = '';
  });
  
  addStockInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const symbol = addStockInput.value.trim().toUpperCase();
      addStock(symbol);
      addStockInput.value = '';
    }
  });
  
  // Widget toggle (minimize/maximize)
  const toggleButton = document.querySelector('.toggle-widget');
  const widget = document.querySelector('.stock-widget');
  
  toggleButton.addEventListener('click', () => {
    widget.classList.toggle('widget-minimized');
    toggleButton.textContent = widget.classList.contains('widget-minimized') ? '+' : '_';
  });
  
  // Close widget
  const closeButton = document.querySelector('.close-widget');
  closeButton.addEventListener('click', () => {
    widget.style.display = 'none';
    // Send message to parent that widget was closed
    window.parent.postMessage({ action: 'closeWidget' }, '*');
  });
  
  // Navigation buttons (for demo, they don't do anything yet)
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  
  prevButton.addEventListener('click', () => {
    console.log('Previous page');
  });
  
  nextButton.addEventListener('click', () => {
    console.log('Next page');
  });
  
  // Start the update interval
  startUpdateInterval();
});

// Listen for messages from the parent window
window.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'addStock':
      addStock(event.data.symbol);
      break;
      
    case 'updateInterval':
      updateInterval = event.data.interval;
      startUpdateInterval();
      break;
  }
});