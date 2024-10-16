import { faMinus, faPlus, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import CounterChart from "./CounterChart";

const backgroundPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

function App() {
  const [counters, setCounters] = useState([
    { id: 1, count: 0, minValue: -10, maxValue: 10, step: 1, history: [] },
  ]);
  const [chartDuration, setChartDuration] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((counter) => ({
          ...counter,
          history: [
            ...counter.history,
            { time: new Date(), value: counter.count },
          ].slice(-300),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleIncrement = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id
          ? {
              ...counter,
              count: Math.min(counter.count + counter.step, counter.maxValue),
            }
          : counter
      )
    );
  };

  const handleDecrement = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id
          ? {
              ...counter,
              count: Math.max(counter.count - counter.step, counter.minValue),
            }
          : counter
      )
    );
  };

  const handleReset = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, count: 0 } : counter
      )
    );
  };

  const handleSettingChange = (id, setting, value) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, [setting]: Number(value) } : counter
      )
    );
  };

  const addCounter = () => {
    if (counters.length < 5) {
      setCounters((prevCounters) => [
        ...prevCounters,
        {
          id: Date.now(),
          count: 0,
          minValue: -10,
          maxValue: 10,
          step: 1,
          history: [],
        },
      ]);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#6a8caf] to-[#a388d8] p-4"
      style={{
        backgroundImage: `${backgroundPattern}, linear-gradient(to bottom right, #6a8caf, #a388d8)`,
        backgroundSize: "100px 100px, 100% 100%",
        backgroundRepeat: "repeat, no-repeat",
      }}
    >
      <div className="w-full max-w-4xl p-8 bg-white shadow-2xl bg-opacity-95 backdrop-filter backdrop-blur-lg rounded-2xl">
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
          Modern Counters
        </h1>

        {counters.map((counter) => (
          <div key={counter.id} className="p-4 mb-8 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <button
                className="flex items-center justify-center w-12 h-12 text-xl text-white transition-all duration-300 transform bg-red-500 rounded-full hover:scale-110 hover:bg-red-600"
                onClick={() => handleDecrement(counter.id)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>

              <div className="text-4xl font-bold text-gray-800">
                {counter.count}
              </div>

              <button
                className="flex items-center justify-center w-12 h-12 text-xl text-white transition-all duration-300 transform bg-green-500 rounded-full hover:scale-110 hover:bg-green-600"
                onClick={() => handleIncrement(counter.id)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <button
              className="w-full px-4 py-2 mb-4 text-white transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => handleReset(counter.id)}
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Reset
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Min Value:
                </label>
                <input
                  type="number"
                  value={counter.minValue}
                  onChange={(e) =>
                    handleSettingChange(counter.id, "minValue", e.target.value)
                  }
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Value:
                </label>
                <input
                  type="number"
                  value={counter.maxValue}
                  onChange={(e) =>
                    handleSettingChange(counter.id, "maxValue", e.target.value)
                  }
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Step:
                </label>
                <input
                  type="number"
                  value={counter.step}
                  onChange={(e) =>
                    handleSettingChange(counter.id, "step", e.target.value)
                  }
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>
            </div>

            <CounterChart data={counter.history} duration={chartDuration} />
          </div>
        ))}

        {counters.length < 5 && (
          <button
            className="w-full px-4 py-2 text-white transition-colors duration-300 bg-purple-500 rounded-lg hover:bg-purple-600"
            onClick={addCounter}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Counter
          </button>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Chart Duration (minutes):
          </label>
          <input
            type="number"
            value={chartDuration}
            onChange={(e) => setChartDuration(Number(e.target.value))}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
