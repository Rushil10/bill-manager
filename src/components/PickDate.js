import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const PickDate = (props) => {
  const [startDate, setStartDate] = useState(props.date);
  const modifyDate = (date) => {
    setStartDate(date);
    props.changeDate(date);
  };
  return (
    <DatePicker selected={startDate} onChange={(date) => modifyDate(date)} />
  );
};

export default PickDate;
