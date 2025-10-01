import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const generateImage = async () => {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_HUGGINGFACE_API_KEY",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );
    const blob = await response.blob();
    setImage(URL.createObjectURL(blob));
  };

  return (
    <div className="App">
      <h1>Image Generator 2.0</h1>
      <input
        type="text"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage}>Generate</button>
      {image && <img src={image} alt="Generated" />}
    </div>
  );
}

export default App;
