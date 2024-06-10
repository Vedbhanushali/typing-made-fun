document.addEventListener('keydown', (event) => {
    const key = event.key;
    console.log(`Key pressed: ${key}`); // For debugging
    chrome.runtime.sendMessage({ type: 'keyPress', key: key });
});