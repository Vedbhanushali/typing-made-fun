chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Extension started');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'keyPress') {
        chrome.storage.local.set({ lastKey: message.key }, () => {
            console.log('Last key pressed saved:', message.key);
        });
    }
});
