import * as encode from "jwt-encode";

import PairsModal from "./pairsModal";
import cloneDeep from "lodash/cloneDeep";
import { useState } from "react";

const OrganizerPage = () => {
  const [pairs, setPairs] = useState([]);
  const [name, setName] = useState("");
  const [preferance, setPreferance] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatedPairs, setGeneratedPairs] = useState([]);

  const generatePairs = () => {
    const shuffledPairs = shuffle(pairs);
    const submitPairs = [];

    shuffledPairs.forEach((el, i) => {
      let pair;
      if (i === 0) {
        pair = encode(shuffledPairs[shuffledPairs.length - 1], "secret");
      } else {
        pair = encode(shuffledPairs[i - 1], "secret");
      }

      const url = generateUrl(el.name, pair);

      submitPairs.push({ ...el, url });
    });

    setGeneratedPairs(shuffle(submitPairs));
    setShowModal(true);
  };

  const generateUrl = (name, pairToken) =>
    `${window.location.href}?name=${name}&pairToken=${pairToken}`;

  const shuffle = (arr) => {
    const copy = cloneDeep(arr);
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
    <>
      <div className="organizer-container">
        <div className="pairs-container">
          {pairs.map((pair, i) => (
            <div key={`pair${i}`}>
              <p className="name">{pair.name}</p>
              <p className="preferance">{pair.preferance}</p>
              <button
                onClick={() => {
                  let tempArr = cloneDeep(pairs);
                  tempArr.splice(i, 1);
                  setPairs(tempArr);
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="input-container">
            <input
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
              placeholder="Name"
            />
            <input
              placeholder="Preferances"
              onChange={(e) => setPreferance(e.currentTarget.value)}
              value={preferance}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button id="generate-button" onClick={generatePairs}>
          Generate Pairs
        </button>
      </div>
      <PairsModal
        show={showModal}
        data={generatedPairs}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default OrganizerPage;
