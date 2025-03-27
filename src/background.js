// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Stock Widget Extension installed");
  
  // Initialize default settings
  chrome.storage.local.get(['widgetVisible', 'updateInterval'], (result) => {
    if (result.widgetVisible === undefined) {
      chrome.storage.local.set({ widgetVisible: true });
    }
    
    if (result.updateInterval === undefined) {
      chrome.storage.local.set({ updateInterval: 10000 });
    }
  });
});

// Listen for tab updates to ensure widget is injected on page navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    // Check if widget should be visible
    chrome.storage.local.get(['widgetVisible'], (result) => {
      const isVisible = result.widgetVisible !== false;
      
      // Send message to content script
      chrome.tabs.sendMessage(tabId, { 
        action: isVisible ? 'showWidget' : 'hideWidget' 
      }).catch(err => {
        // This might fail if the content script isn't loaded yet, which is fine
        console.log("Could not send message to tab, content script may not be ready");
      });
    });
  }
});
