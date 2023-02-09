import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./TotalBilling.css";

function TotalBilling(props) {
  const bills = useSelector((state) => state.bills.bills);

  const [amount, setAmount] = useState(0);

  const calculateTotalAmount = () => {
    var allBills = [...props.bills];
    var total = 0;
    allBills.forEach((bill) => {
      total += Number(bill.amount);
    });
    setAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [props.bills]);

  return (
    <div className="total-container">
      <h4>Number of Bills : {props.bills.length}</h4>
      <h2>Total : $ {amount}</h2>
    </div>
  );
}

export default TotalBilling;
