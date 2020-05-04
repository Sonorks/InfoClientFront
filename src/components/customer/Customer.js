import React from 'react';
import {Button} from 'react-bootstrap';

const customer = (props) => {
return (
    <tr>
        <td>{props.customer.nit}</td>
        <td>{props.customer.fullname}</td>
        <td>{props.customer.address}</td>
        <td>{props.customer.phone}</td>
        <td>{props.customer.city}</td>
        <td>{props.customer.state}</td>
        <td>{props.customer.country}</td>
        <td>{props.customer.creditLimit}</td>
        <td>{props.customer.availableCredit}</td>
        <td>{props.customer.visitsPercentage}</td>
        <td><Button variant="outline-info" onClick={props.showCustomerActions}>Actions</Button></td>


    </tr>
    );
}

export default customer;