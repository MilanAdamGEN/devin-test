console.log("Content script loaded");

let widgetIframe = null;
let widgetVisible = true;

// Function to inject the stock widget iframe
function injectStockWidget() {
  // Check if widget should be visible (from storage)
  chrome.storage.local.get(['widgetVisible'], (result) => {
    if (result.widgetVisible === undefined) {
      widgetVisible = true;
    } else {
      widgetVisible = result.widgetVisible;
    }
    
    // Create iframe element
    widgetIframe = document.createElement('iframe');
    
    // Set attributes
    widgetIframe.id = 'stock-widget-iframe';
    widgetIframe.src = chrome.runtime.getURL('widget.html');
    
    // Set styles
    widgetIframe.style.position = 'fixed';
    widgetIframe.style.bottom = '20px';
    widgetIframe.style.right = '20px';
    widgetIframe.style.width = '400px';
    widgetIframe.style.height = '500px';
    widgetIframe.style.border = 'none';
    widgetIframe.style.zIndex = '9999';
    widgetIframe.style.borderRadius = '10px';
    widgetIframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    widgetIframe.style.transition = 'opacity 0.3s ease';
    
    // Set visibility based on stored preference
    if (!widgetVisible) {
      widgetIframe.style.display = 'none';
    }
    
    // Append to body
    document.body.appendChild(widgetIframe);
    
    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
      if (event.data.action === 'closeWidget') {
        widgetIframe.style.display = 'none';
        widgetVisible = false;
        chrome.storage.local.set({ widgetVisible: false });
      }
    });
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!widgetIframe) return;
  
  switch (message.action) {
    case 'showWidget':
      widgetIframe.style.display = 'block';
      widgetVisible = true;
      break;
      
    case 'hideWidget':
      widgetIframe.style.display = 'none';
      widgetVisible = false;
      break;
      
    case 'addStock':
      // Forward the message to the iframe
      widgetIframe.contentWindow.postMessage({ 
        action: 'addStock', 
        symbol: message.symbol 
      }, '*');
      break;
      
    case 'updateInterval':
      // Forward the message to the iframe
      widgetIframe.contentWindow.postMessage({ 
        action: 'updateInterval', 
        interval: message.interval 
      }, '*');
      break;
  }
});

// Wait for the page to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStockWidget);
} else {
  injectStockWidget();
}
