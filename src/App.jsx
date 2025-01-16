import React, { useState } from 'react';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [recognizedCommand, setRecognizedCommand] = useState("");
  const [response, setResponse] = useState("");

  const handleCommand = (command) => {
    // Normalize the command to lowercase
    const normalizedCommand = command.toLowerCase();

    if (normalizedCommand.includes("open whatsapp")) {
      const message = "Opening WhatsApp...";
      setResponse(message);
      window.open("https://www.whatsapp.com", "_blank");
    } else if (normalizedCommand.includes("what is your name")) {
      setResponse("I am your Voice Assistant!");
    } else if (normalizedCommand.includes("open google")) {
      const message = "Opening Google...";
      setResponse(message);
      window.open("https://www.google.com", "_blank");
    } else if (normalizedCommand.includes("stop listening")) {
      setResponse("Stopped listening.");
      setIsListening(false);
    } else {
      setResponse(`Sorry, I didn't understand "${command}".`);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser. Try using Chrome!");
      return;
    }

    // Initialize SpeechRecognition
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = "en-US"; // Set language to English
    rec.interimResults = false; // Provide only the final results
    rec.maxAlternatives = 1;

    // On result
    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedCommand(transcript); // Update recognized command
      handleCommand(transcript); // Process the recognized command
      console.log("Recognized speech:", transcript);
    };

    // On error
    rec.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("An error occurred during speech recognition: " + event.error);
    };

    // Start recognition
    rec.start();
    setIsListening(true);
    setResponse("Listening for commands...");
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-800 text-white">
      {/* Title */}
      <h1 className="font-bold text-3xl mb-8">Voice Assistant</h1>

      {/* Listening Status */}
      <p className="mb-6 text-lg">
        {isListening ? "Listening for your command..." : "Click Start to begin."}
      </p>

      {/* Start Button */}
      <button
        onClick={startListening}
        className="px-8 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 transition-all"
      >
        {isListening ? "Listening..." : "Start"}
      </button>

      {/* Recognized Command */}
      <div className="px-6 py-4 mt-8 bg-gray-700 rounded-lg shadow-md w-80 text-gray-300">
        <h3 className="font-bold text-xl mb-2">Recognized Command:</h3>
        <p>{recognizedCommand || "No command recognized yet."}</p>
      </div>

      {/* Assistant's Response */}
      <div className="px-6 py-4 mt-4 bg-gray-700 rounded-lg shadow-md w-80 text-gray-300">
        <h3 className="font-bold text-xl mb-2">Assistant's Response:</h3>
        <p>{response || "No response yet."}</p>
      </div>
    </div>
  );
}

export default App;
