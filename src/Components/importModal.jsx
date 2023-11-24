import { Importer, ImporterField } from "react-csv-importer";

import Modal from "react-bootstrap/Modal";
import cloneDeep from "lodash/cloneDeep";
import { useState } from "react";

const PairsModal = ({ show, handleClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  let pairs = [];

  const handleImportData = (data) => {
    const pairsCopy = cloneDeep(pairs);

    pairs = [...pairsCopy, ...data];
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose([])}
      className="import-modal"
      centered
    >
      <button className="modal-close" onClick={handleClose}>
        X
      </button>
      <h2>Import CSV</h2>
      <Importer
        dataHandler={async (rows) => {
          handleImportData(rows);
        }}
        onComplete={() => handleClose(pairs)}
      >
        <ImporterField name="name" label="Name" />
        <ImporterField name="preferance" label="Preferences" />
        <ImporterField name="lastAssigned" label="Last Assigned" />
      </Importer>
    </Modal>
  );
};

export default PairsModal;
