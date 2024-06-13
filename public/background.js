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

    const getRandomIndex = (mini, maxi) => {
        return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
    }

    const playMechanicalKeyboard = (mini, maxi) => {
        baseURL += 'mechanical_keyboard/'
        if (key == ' ') {
            baseURL += "space.wav"
        }
        else if ('0' <= key && key <= '9') {
            baseURL += `numpad/${getRandomIndex(mini, maxi)}.wav`
        } else {
            baseURL += `alphabets/${getRandomIndex(mini, maxi)}.wav`
        }
    }

    const playTypewritter = (mini, maxi) => {
        baseURL += `typewritter/`
        if (key == ' ') {
            baseURL += "space.wav"
        } else {
            baseURL += `${getRandomIndex(mini, maxi)}.wav`
        }
    }

    switch (theme) {
        case "mechanical_keyboard":
            playMechanicalKeyboard(0, 3)
            break;
        case "typewritter":
            playTypewritter(0, 4)
            break;
        default:
            //default mechanical keyboard
            playMechanicalKeyboard(0, 3)
    }
    new Audio(baseURL).play();
}
