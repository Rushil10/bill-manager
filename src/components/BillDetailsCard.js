import React, { useState } from "react";
import "./BillDetailsCard.css";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import BillModal from "./BillModal";
import store from "../redux/store";
import { deleteBill } from "../redux/bills/billActions";
import { useSelector } from "react-redux";

function BillDetailsCard(props) {
  const [open, setOpen] = useState(false);
  const indexes = useSelector((state) => state.bills.highlightedID);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const deleteABill = () => {
    store.dispatch(deleteBill(props.bill.id));
  };

  return (
    <>
      <div
        className="billdetails-container"
        style={{
          backgroundColor: indexes.includes(props.bill.id.toString())
            ? "rgba(0, 255, 0, 0.3)"
            : "transparent",
        }}
      >
        <h3>ID : {props.bill.id}</h3>
        <h4>
          Details :{" "}
          <span className="billDetailsText">{props.bill.description}</span>
        </h4>
        <h4>
          Category :{" "}
          <span className="billDetailsText">{props.bill.category}</span>
        </h4>
        <h4>
          Date : <span className="billDetailsText">{props.bill.date}</span>
        </h4>
        <div className="billAmount">
          <div onClick={openModal} className="edit-options">
            <div>
              <CiEdit color="#101010" size={28} />
            </div>
            <div onClick={deleteABill} style={{ marginLeft: 5 }}>
              <MdOutlineDelete color="red" size={28} />
            </div>
          </div>
          <h2 className="amount">${props.bill.amount}</h2>
        </div>
      </div>
      <BillModal bill={props.bill} open={open} closeModal={closeModal} />
    </>
  );
}

export default BillDetailsCard;
