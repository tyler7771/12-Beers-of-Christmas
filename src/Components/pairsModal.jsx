import { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import CsvDownload from "react-json-to-csv";
import Modal from "react-bootstrap/Modal";

const PairsModal = ({ show, data, handleClose }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [showAlert]);
  return (
    <Modal show={show} onHide={handleClose} className="pairs-modal" centered>
      <Alert className="copy-alert" show={showAlert} transition>
        Copied!
      </Alert>
      {!showAlert && <div className="alert-placeholder" />}
      <button className="modal-close" onClick={handleClose}>
        X
      </button>
      <h2>Generated Pairs!</h2>
      <div id="pairs-data">
        {data.length !== 0 &&
          data.map((el, i) => (
            <div className="pair-container" key={`generated-pair-${i}`}>
              <h3>{el.name}</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(el.url);
                  setShowAlert(true);
                }}
              >
                Copy Url
              </button>
            </div>
          ))}
      </div>
      <CsvDownload id="csv-button" data={data} />
    </Modal>
  );
};

export default PairsModal;
