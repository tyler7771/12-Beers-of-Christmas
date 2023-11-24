import { useEffect, useState } from "react";

import decode from "jwt-decode";

const ParticipantPage = () => {
  const [participantObj, setParticipantObj] = useState({});

  useEffect(() => {
    const str = window.location.search;
    const objURL = {};

    str.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function ($0, $1, $2, $3) {
        objURL[$1] = $3;
      }
    );

    const decoded = decode(objURL.pairToken);

    setParticipantObj({ participantName: objURL.name, ...decoded });
  }, []);

  return (
    <div className="participant-container">
      {participantObj.name && (
        <div className={"participant-card"}>
          <h2>
            Hi {participantObj.participantName.split("+")[0]}! You're buying
            beers for
          </h2>
          <p>{participantObj.name}</p>
          <span>Their preferences: {participantObj.preferance}</span>
        </div>
      )}
    </div>
  );
};

export default ParticipantPage;
