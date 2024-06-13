chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'keyPress') {
        chrome.storage.local.get(['startClicked', 'theme'], function (data) {
            if (data.startClicked) {
                //sound play
                chrome.scripting.executeScript({
                    target: { tabId: sender.tab.id },
                    function: playSound,
                    args: [data.theme, message.key]
                });
            } //else application not started
        });
    }
});

function playSound(theme, key) {
    let baseURL = chrome.runtime.getURL("assets/sounds/")

    const getRandomIndex = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const executeMechanicalKeyboard = () => {
        baseURL += "mechanical_keyboard/"
        if (key == ' ') {
            baseURL += "space.wav"
        }
        else if ('0' <= key && key <= '9') {
            baseURL += `numpad/${getRandomIndex(0, 3)}.wav`
        } else {
            baseURL += `alphabets/${getRandomIndex(0, 3)}.wav`
        }
    }

    switch (theme) {
        case "mechanical_keyboard":
            executeMechanicalKeyboard()
            break;
        case "typewriter":
            break;
        case "animal":
            break;
        default:
            //default mechanical keyboard
            executeMechanicalKeyboard()
    }
    new Audio(baseURL).play();
}
