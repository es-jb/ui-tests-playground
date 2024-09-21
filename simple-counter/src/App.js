import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex space-x-8 items-center">
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span id="counter" className="text-6xl font-bold text-gray-800">
          {count}
        </span>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
