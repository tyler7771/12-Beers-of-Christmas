import * as encode from "jwt-encode";

import ImportModal from "./importModal";
import PairsModal from "./pairsModal";
import cloneDeep from "lodash/cloneDeep";
import { useState } from "react";

const OrganizerPage = () => {
  const [pairs, setPairs] = useState([]);
  const [name, setName] = useState("");
  const [preferance, setPreferance] = useState("");
  const [lastAssigned, setLastAssigned] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [generatedPairs, setGeneratedPairs] = useState([]);

  const generatePairs = () => {
    let shuffledPairs = shuffle(pairs);
    while (checkLastAssigned(shuffledPairs)) {
      shuffledPairs = shuffle(pairs);
    }
    const submitPairs = [];

    shuffledPairs.forEach((el, i) => {
      const pair = encode(
        shuffledPairs[i === 0 ? pairs.length - 1 : i - 1],
        "secret"
      );

      const url = generateUrl(el.name, pair);

      submitPairs.push({ ...el, url });
    });

    setGeneratedPairs(shuffle(submitPairs));
    setShowModal(true);
  };

  const checkLastAssigned = (pairs) => {
    const checkName = (last, current) => {
      return last === current;
    };

    for (let i = 0; i < pairs.length; i++) {
      const current = pairs[i];
      const pair = i === 0 ? pairs.length - 1 : i - 1;

      if (checkName(current.lastAssigned, pairs[pair].name)) return true;
    }

    return false;
  };

  const generateUrl = (name, pairToken) =>
    `${window.location.href}?name=${name
      .split(" ")
      .join("+")}&pairToken=${pairToken}`;

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
      lastAssigned,
    });

    setPairs(pairsCopy);
    setName("");
    setPreferance("");
    setLastAssigned("");
  };

  const handleImportClose = (data) => {
    setPairs(data);
    setShowImportModal(false);
  };

  return (
    <>
      <div className="organizer-container">
        <div className="pairs-container">
          {pairs.map((pair, i) => (
            <div key={`pair${i}`}>
              <p className="name">{pair.name}</p>
              <p className="last-assigned">
                Last Assigned: {pair.lastAssigned}
              </p>
              <p className="preferance">Preferances: {pair.preferance}</p>
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
            <input
              placeholder="Assigned Last Year"
              onChange={(e) => setLastAssigned(e.currentTarget.value)}
              value={lastAssigned}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div id="button-container">
          <button id="import-button" onClick={() => setShowImportModal(true)}>
            Import CSV
          </button>
          <button onClick={generatePairs}>Generate Pairs</button>
        </div>
      </div>
      <PairsModal
        show={showModal}
        data={generatedPairs}
        handleClose={() => setShowModal(false)}
      />
      <ImportModal show={showImportModal} handleClose={handleImportClose} />
    </>
  );
};

export default OrganizerPage;
