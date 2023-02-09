import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import TimeSeriesChart from "./TimeSeriesChart";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #1da1f2",
    width: "75%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
};

function TimeSeriesModal(props) {
  return (
    <div>
      <Modal
        isOpen={props.open}
        onRequestClose={props.closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Selected Option"
      >
        <TimeSeriesChart bills={props.bills} />
      </Modal>
    </div>
  );
}

export default TimeSeriesModal;
