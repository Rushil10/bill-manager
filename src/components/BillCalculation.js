import React, { useState } from "react";
import "./BillCalculation.css";
import CoolButton from "./CoolButton";
import store from "../redux/store";
import { removeHighlights, setHighlights } from "../redux/bills/billActions";
import { useSelector } from "react-redux";

function BillCalculation(props) {
  const [amount, setAmount] = useState(0);
  const highlights = useSelector((state) => state.bills.highlightedID);
  const getBills = () => {
    if (amount < 0) {
      return;
    }
    var allBills = [...props.bills];
    allBills.sort(function (a, b) {
      return Number(a.amount) > Number(b.amount)
        ? -1
        : Number(b.amount) > Number(a.amount)
        ? 1
        : 0;
    });
    console.log(allBills);
    var highlightedIDS = [];
    var amt = 0;
    allBills.forEach((bill) => {
      amt += Number(bill.amount);
      if (amt <= Number(amount)) {
        console.log("Here");
        highlightedIDS.push(bill.id.toString());
      } else {
        amt -= Number(bill.amount);
      }
    });
    console.log(highlightedIDS);
    store.dispatch(setHighlights(highlightedIDS));
  };

  const onCancel = () => {
    setAmount(0);
    store.dispatch(removeHighlights());
  };

  return (
    <div className="calc-container">
      <p>Enter Amount :</p>
      <input
        value={amount}
        onChange={(val) => setAmount(val.target.value)}
        placeholder="Amount"
        type="number"
      />
      {highlights.length > 0 && (
        <p>Minimum number of bills to be paid : {highlights.length}</p>
      )}
      <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
        <CoolButton name="Calculate" onClick={getBills} />
        <div style={{ width: 25 }}></div>
        <CoolButton name="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}

export default BillCalculation;
