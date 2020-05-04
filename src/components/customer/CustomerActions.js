import React from 'react';
import {Button, ButtonGroup, Modal} from 'react-bootstrap';


const CustomerActions = (props) => {
    return (
        <Modal show={true} size="lg">
            <Modal.Header>
                SELECT ACTION
            </Modal.Header>
            <Modal.Body>
                <ButtonGroup className="mr-2" aria-label="Actions">
                    <Button variant="outline-info" onClick={props.updateCustomer}>Update Customer</Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                    <Button variant="outline-success" onClick={props.createVisit}>Create Visit</Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                    <Button variant="outline-success" onClick={props.showVisits}>Show All Visits</Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                    <Button variant="outline-danger" onClick={props.deleteCustomer}>Delete Customer</Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                    <Button variant="outline-secondary" onClick={props.close} >Close</Button>
                </ButtonGroup>
            </Modal.Body>
        </Modal>
    );
}

export default CustomerActions;