// console.log("Content script loaded");
document.addEventListener('keydown', (event) => {
    const key = event.key;
    chrome.runtime.sendMessage({ type: 'keyPress', key: key });
});