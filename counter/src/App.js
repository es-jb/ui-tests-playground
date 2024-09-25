import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center space-x-8">
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span id="counter" className="text-6xl font-bold text-gray-800">
          {count}
        </span>
        <button
          className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
