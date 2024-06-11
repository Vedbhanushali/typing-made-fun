import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [startApplication, setStartApplication] = useState(false);
  // console.log(startApplication, "startApplication value");
  useEffect(() => {
    chrome.storage.local.get("startClicked", (data) => {
      if (data.startClicked) {
        // console.log(data.startClicked, "value from storage");
        setStartApplication(data.startClicked || false);
      }
    });
  }, []);

  const toggleStartApplication = () => {
    const newValue = !startApplication;
    // console.log("initial value", startApplication);
    setStartApplication(newValue);
    // console.log(newValue, "setting in storage");
    chrome.storage.local.set({ startClicked: newValue }, () => {
      // console.log("Start button was clicked");
    });
  };

  return (
    <div className="card">
      <h3>Typing made fun</h3>
      <label>Start Application {startApplication}</label>
      <input
        type="checkbox"
        onChange={toggleStartApplication}
        checked={startApplication}
      />
    </div>
  );
}

export default App;
