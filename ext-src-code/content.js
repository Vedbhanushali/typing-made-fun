console.log("Enjoy Typing Made Fun...")
document.addEventListener('keydown', (event) => {
    const key = event.key;
    chrome.runtime.sendMessage({ type: 'keyPress', key: key });
});