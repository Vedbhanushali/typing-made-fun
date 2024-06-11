chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'keyPress') {
        chrome.storage.local.get(['startClicked'], function (data) {
            if (data.startClicked) {
                console.log('Last key pressed saved:', message.key);
                //sound play
            } else {
                console.log('Application not started yet.');
            }
        });
    }
});
