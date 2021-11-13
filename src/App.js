import "./App.css";

import cloneDeep from "lodash/cloneDeep";
import { useState } from "react";

const App = () => {
  const [pairs, setPairs] = useState([]);
  const [name, setName] = useState("");
  const [preferance, setPreferance] = useState("");

  const generatePairs = () => {
    const shuffledPairs = shuffle();
    const submitPairs = [];

    shuffledPairs.forEach((el, i) => {
      if (i === 0) {
        const pair = shuffledPairs[shuffledPairs.length - 1];
        submitPairs.push({ ...el, pair });
        return;
      }

      submitPairs.push({ ...el, pair: shuffledPairs[i - 1] });
    });
    debugger;
  };

  const shuffle = () => {
    const copy = cloneDeep(pairs);
    let currentIndex = copy.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [copy[currentIndex], copy[randomIndex]] = [
        copy[randomIndex],
        copy[currentIndex],
      ];
    }

    return copy;
  };

  const handleSubmit = () => {
    const pairsCopy = cloneDeep(pairs);

    pairsCopy.push({
      name,
      preferance,
    });

    setPairs(pairsCopy);
    setName("");
    setPreferance("");
  };

  return (
    <div className="App">
      {pairs.map((pair, i) => (
        <div key={`pair${i}`}>
          <span>{pair.name}</span>
          <span>{pair.preferance}</span>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input onChange={(e) => setName(e.currentTarget.value)} value={name} />
        <input
          onChange={(e) => setPreferance(e.currentTarget.value)}
          value={preferance}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={generatePairs}>Generate Pairs</button>
    </div>
  );
};

export default App;
