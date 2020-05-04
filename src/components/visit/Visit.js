import { Table, Container } from "react-bootstrap"
import React from 'react'


const Visit = (props) => {
    return (
            <tr>
                <td>{props.visit.date}</td>
                <td>{props.salesRep}</td>
                <td>{props.visit.net}</td>
                <td>{props.visit.visitTotal}</td>
                <td>{props.visit.description}</td>
            </tr>
    )
}

export default Visit;