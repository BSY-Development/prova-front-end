import React, { useContext } from 'react';
import MyContext from '../context/context';
import styles from "./Main.module.css";
import Table from "./Table";

function Main() {
  const { data } = useContext(MyContext);
  console.log(data)

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Table data={data} rowsPerPage={10} />
      </div>
    </main>
  );
}

export default Main;
