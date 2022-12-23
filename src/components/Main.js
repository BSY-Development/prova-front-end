import React, { useEffect, useState } from 'react';
import styles from "./Main.module.css";
import Table from "./Table";
import { Navigate, useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

function Main() {
  const [data, setData] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { page } = useParams();
  const [myActualPage, setMyActualPage] = useState(page)
  const [totalPerson, setTotalPerson] = useState(0)

  useEffect(() => {
    const response = async (authToken) => {
      const api = `http://localhost:9000/api/pessoas/${myActualPage}`;
      const result = await fetch(api, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authToken,
        }),
      })
      if (result.status === 401) {
        localStorage.removeItem("token")
        setShouldRedirect(true)
      } else {
        let dataContent = await result.json()
        setData(dataContent);
      }
    };
    let authToken = JSON.parse(localStorage.getItem("token"))
    if (authToken) {
      response(authToken);
    }
  }, [myActualPage]);

  useEffect(() => {
    const response = async (authToken) => {
      const api = "http://localhost:9000/api/pessoas/";
      const result = await fetch(api, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authToken,
        }),
      })
      if (result.status === 401) {
        localStorage.removeItem("token")
        setShouldRedirect(true)
      } else {
        let dataContent = await result.json()
        setTotalPerson(parseInt(dataContent, 10));
      }
    };
    let authToken = JSON.parse(localStorage.getItem("token"))
    if (authToken) {
      response(authToken);
    }
  }, []);

  const token = JSON.parse(localStorage.getItem("token"))
  if (!token || shouldRedirect) {
    return <Navigate to="/login" />;
  }

  if (page !== myActualPage) {
    return <Navigate to={`/${myActualPage}`} />
  }

  return (
    <div>
      <Header isSigned={ true } />
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <Table data={data} rowsPerPage={10} myActualPage={myActualPage} totalPerson={totalPerson} setMyActualPage={setMyActualPage} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
