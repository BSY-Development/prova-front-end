import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage, myActualPage, totalPerson, setMyActualPage }) => {
    const pages = totalPerson;
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage, pages);

    const formatCpf = (v) => {
        v=v.replace(/\D/g,"")
        v=v.replace(/(\d{3})(\d)/,"$1.$2")
        v=v.replace(/(\d{3})(\d)/,"$1.$2")
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        return v
    }

    const formatMoney = (numero) => {
        numero = parseFloat(numero).toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Nome</th>
                        <th className={styles.tableHeader}>CPF</th>
                        <th className={styles.tableHeader}>Salário Bruto</th>
                        <th className={styles.tableHeader}>Descontos</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.cpf}>
                            <td className={styles.tableCell}>{el.nome}</td>
                            <td className={styles.tableCell}>{formatCpf(el.cpf)}</td>
                            <td className={styles.tableCell}>{formatMoney(el.salarioBruto.$numberDecimal)}</td>
                            <td className={styles.tableCell}>{formatMoney(el.descontos.$numberDecimal)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} myActualPage={myActualPage} setMyActualPage={setMyActualPage} />
        </>
    );
};

export default Table;
