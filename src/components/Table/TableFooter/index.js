import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice, myActualPage, setMyActualPage }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  const navigation = (el) => {
    setPage(el)
    setMyActualPage(el.toString())
  }

  return (
    <div className={styles.tableFooter}>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            parseInt(myActualPage, 10) === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => navigation(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
