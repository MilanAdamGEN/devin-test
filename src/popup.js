document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup loaded");
  
  // Get DOM elements
  const widgetToggle = document.getElementById('widget-toggle');
  const updateInterval = document.getElementById('update-interval');
  const stockSymbolInput = document.getElementById('stock-symbol');
  const addStockBtn = document.getElementById('add-stock-btn');
  
  // Initialize widget toggle based on stored preference
  chrome.storage.local.get(['widgetVisible'], (result) => {
    if (result.widgetVisible === undefined) {
      // Default to visible if not set
      widgetToggle.checked = true;
      chrome.storage.local.set({ widgetVisible: true });
    } else {
      widgetToggle.checked = result.widgetVisible;
    }
  });
  
  // Initialize update interval based on stored preference
  chrome.storage.local.get(['updateInterval'], (result) => {
    if (result.updateInterval) {
      updateInterval.value = result.updateInterval;
    } else {
      // Default to 10 seconds
      chrome.storage.local.set({ updateInterval: 10000 });
    }
  });
  
  // Handle widget toggle change
  widgetToggle.addEventListener('change', () => {
    const isVisible = widgetToggle.checked;
    chrome.storage.local.set({ widgetVisible: isVisible });
    
    // Send message to all tabs to show/hide widget
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { action: isVisible ? 'showWidget' : 'hideWidget' });
      });
    });
  });
  
  // Handle update interval change
  updateInterval.addEventListener('change', () => {
    const interval = parseInt(updateInterval.value);
    chrome.storage.local.set({ updateInterval: interval });
    
    // Send message to all tabs to update interval
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { action: 'updateInterval', interval });
      });
    });
  });
  
  // Handle add stock button click
  addStockBtn.addEventListener('click', () => {
    addStock();
  });
  
  // Handle enter key press in input
  stockSymbolInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addStock();
    }
  });
  
  // Function to add a stock
  function addStock() {
    const symbol = stockSymbolInput.value.trim().toUpperCase();
    if (symbol) {
      // Send message to all tabs to add stock
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { action: 'addStock', symbol });
        });
      });
      stockSymbolInput.value = '';
    }
  }
});
