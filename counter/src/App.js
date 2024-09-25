import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-center w-full h-full p-4">
        <button
          className="flex items-center justify-center w-1/2 h-full mr-2 font-bold text-white transition-all duration-300 bg-red-600 bg-opacity-75 border-4 border-red-700 rounded-lg hover:bg-opacity-100"
          onClick={() => setCount(count - 1)}
        >
          <FontAwesomeIcon icon={faMinus} size="5x" />
        </button>

        <div
          className="flex items-center justify-center px-10 py-5 mx-2 bg-white bg-opacity-50 rounded-lg"
          style={{ minWidth: "300px" }}
        >
          <span id="counter-value" className="font-bold text-gray-800 text-9xl">
            {count}
          </span>
        </div>

        <button
          className="flex items-center justify-center w-1/2 h-full ml-2 font-bold text-white transition-all duration-300 bg-green-600 bg-opacity-75 border-4 border-green-700 rounded-lg hover:bg-opacity-100"
          onClick={() => setCount(count + 1)}
        >
          <FontAwesomeIcon icon={faPlus} size="5x" />
        </button>
      </div>
    </div>
  );
}

export default App;
