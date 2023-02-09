import { useSelector } from "react-redux";
import { setBillData } from "../../redux/bills/billActions";
import store from "../../redux/store";
import "./homescreen.css";
import React, { useEffect, useState } from "react";
import BillDetailsCard from "../../components/BillDetailsCard";
import CoolButton from "../../components/CoolButton";
import BillModal from "../../components/BillModal";
import TotalBilling from "../../components/TotalBilling";
import FilterDropdown from "../../components/FilterDropdown";
import TimeSeriesChart from "../../components/TimeSeriesChart";
import TimeSeriesModal from "../../components/TimeSeriesModal";

function HomeScreen() {
  useEffect(() => {
    console.log("Calling");
    store.dispatch(setBillData());
  }, []);

  const [open, setOpen] = useState(false);
  const [graphModal, setGraphModal] = useState(false);

  const bills = useSelector((state) => state.bills.bills);
  const loading = useSelector((state) => state.bills.loading);
  const error = useSelector((state) => state.bills.error);
  const [copyOfBills, setCopyOfBills] = useState([]);

  useEffect(() => {
    setCopyOfBills([...bills]);
  }, [bills]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openGraphModal = () => {
    setGraphModal(true);
  };

  const closeGraphModal = () => {
    setGraphModal(false);
  };

  if (error.length !== 0) {
    return <h4>{error}</h4>;
  }

  const filterCategory = (category) => {
    var allBills = [...bills];
    if (category == "All Bills") {
      setCopyOfBills(allBills);
      return;
    }
    var filtered = allBills.filter((item) => item.category === category);
    setCopyOfBills(filtered);
  };

  /* if (loading) {
    return <h4>Loading</h4>;
  } */

  return (
    <>
      <div className="main-container">
        <div id="column1" className="bill-manager">
          <div className="features">
            <CoolButton name="Add" onClick={() => openModal()} />
            <div style={{ width: 15 }}></div>
            <FilterDropdown filterCategory={filterCategory} />
            <div style={{ width: 15 }}></div>
            <CoolButton name="Graph" onClick={() => openGraphModal()} />
          </div>
          <div className="bills">
            {!loading ? (
              copyOfBills.map((bill) => (
                <BillDetailsCard key={bill.id} bill={bill} />
              ))
            ) : (
              <h4>Loading</h4>
            )}
          </div>
        </div>
        <div id="column2">
          <TotalBilling bills={copyOfBills} />
        </div>
      </div>
      <BillModal open={open} closeModal={closeModal} />
      <TimeSeriesModal
        bills={copyOfBills}
        open={graphModal}
        closeModal={closeGraphModal}
      />
    </>
  );
}

export default HomeScreen;
