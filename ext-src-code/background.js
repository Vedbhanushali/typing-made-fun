let keyPressCount = 0;
let backSpaceCount = 0;
let startTime = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'keyPress') {
        chrome.storage.local.get(['startClicked', 'theme'], function (data) {
            if (data.startClicked) {
                if (startTime === null) startTime = Date.now();
                if (isValidKey(message.key)) keyPressCount++;
                if (message.key == 'Backspace') backSpaceCount++;
                //sound play
                chrome.scripting.executeScript({
                    target: { tabId: sender.tab.id },
                    function: playSound,
                    args: [data.theme, message.key]
                });
                //calculating words per minute
                let timeElapsedInMinutes = (Date.now() - startTime) / 1000 / 60;
                const wpm = (keyPressCount / 5) / timeElapsedInMinutes;
                chrome.storage.local.set({ wpm: Math.round(wpm) });
                //calculating accuracy
                let accuracy = 100 - (backSpaceCount / keyPressCount) * 100;
                // chrome.storage.local.set({ accuracy: Math.round(accuracy) });
            } //else application not started
        });
    }
});

function isValidKey(key) {
    // numeric , alphabets case insensitive
    return key.match(/^[a-z0-9]$/i);
}

function playSound(theme, key) {
    let baseURL = chrome.runtime.getURL("assets/sounds/")

    const getRandomIndex = (mini, maxi) => {
        return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
    }

    const playTheme = (mini, maxi) => {
        baseURL += `${theme}/`
        if (key == ' ') {
            baseURL += "space.wav"
        } else if (key == 'Enter') {
            baseURL += "enter.wav"
        } else if (key == 'Backspace') {
            baseURL += "backspace.wav"
        }
        else {
            baseURL += `${getRandomIndex(mini, maxi)}.wav`
        }
    }

    switch (theme) {
        case "mechanical_keyboard":
            playTheme(0, 3)
            break;
        case "typewriter":
            playTheme(0, 3)
            break;
        case "numpad":
            playTheme(0, 3)
            break;
        case "chess":
            playTheme(0, 2)
            break;
        default:
            //default mechanical keyboard
            theme = 'mechanical_keyboard'
            playTheme(0, 3)
    }
    new Audio(baseURL).play();
}
