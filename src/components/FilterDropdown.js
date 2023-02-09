import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function FilterDropdown(props) {
  const bills = useSelector((state) => state.bills.bills);
  const [selectedValue, setSelectedValue] = useState("All Bills");

  const [categories, setCategories] = useState([]);

  const changeCategories = () => {
    var allBills = [...bills];
    var unique = [
      "All Bills",
      ...new Set(allBills.map((item) => item.category)),
    ];
    setCategories(unique);
  };

  const filterBills = (category) => {
    setSelectedValue(category);
    props.filterCategory(category);
  };

  useEffect(() => {
    changeCategories();
    setSelectedValue("All bills");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bills]);
  return (
    <div>
      <Dropdown
        options={categories}
        onChange={(data) => filterBills(data.value)}
        value={selectedValue}
        placeholder="Select an option"
      />
    </div>
  );
}

export default FilterDropdown;
