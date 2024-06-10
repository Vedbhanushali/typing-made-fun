chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'keyPress') {
        chrome.storage.local.set({ lastKey: message.key }, () => {
            console.log('Last key pressed saved:', message.key);
        });
    }
});
