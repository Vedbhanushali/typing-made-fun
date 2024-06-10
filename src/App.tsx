import { useState } from "react";
import "./App.css";

function App() {
  const [startApplication, setStartApplication] = useState(true);
  const [activeKey, setActiveKey] = useState("");

  const toggleStartApplication = async () => {
    setStartApplication(!startApplication);
    const [tab] = await chrome.tabs.query({ active: true });
    if (tab.id === undefined) return;
    if (startApplication) {
      chrome.storage.local.get(["lastKey"], (result) => {
        if (result.lastKey) {
          setActiveKey(result.lastKey);
        }
      });
    }
  };

  return (
    <div className="card">
      <h3>Typing made fun</h3>
      <button onClick={toggleStartApplication}>Start Application</button>
      <p>Value - {activeKey}</p>
    </div>
  );
}

export default App;
