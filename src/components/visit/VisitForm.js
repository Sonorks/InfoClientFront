import React, { Component } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import axios from 'axios';

class VisitForm extends Component{

    state = {
        visit: {
            "customer": "",
            "date": "",
            "salesRepresentative": "1",
            "net": 0,
            "visitTotal": 0,
            "description": "",
            "city":""
        }
    }

    updateValue = (event, customer) => {
        const visit = this.state.visit;
        visit[event.target.name] = event.target.value;
        if(event.target.name === "net"){
            let total = event.target.value * customer.visitsPercentage;
            if(total <= customer.availableCredit){
                visit["visitTotal"] = total;
            } else {
                alert("VISIT TOTAL EXCEEDS THE AVAILABLE CREDIT");
                visit["net"] = 0;
            }
          }
        this.setState({visit: visit});
    }

    createVisit = (customer, funcClose) =>{
        if(this.state.visit["net"] === 0){
            alert("PLEASE INSERT THE NET VALUE")
        } else {
            let visit = this.state.visit;
            visit["customer"] = customer.nit;
            visit["date"] = this.getFormatDate();
            visit["city"] = customer.city;

            console.log(visit["city"]);

            axios.post("http://localhost:8080/visit", visit)
            .then(response=>{
                alert("VISIT CREATED")
                this.setState({visit: {
                    "customer": "",
                    "date": "",
                    "salesRepresentative": "1",
                    "net": 0,
                    "visitTotal": 0,
                    "description": ""
                }})
                funcClose.apply();
            }).catch(error => {
                alert(error.response.data)
            })
        }
    }

    getFormatDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }


    render(){

        let salesRep = null;

        salesRep = this.props.salesReps.map((salesRep) =>{
            return <option value={salesRep.code}>{salesRep.name}</option>
        })

        return(
            <Modal show={true}>
                <Modal.Header>
                    CREATE VISIT ASOCIATED TO CUSTOMER {this.props.customer.nit}
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>CUSTOMER</Form.Label>
                    <Form.Control type="text" readOnly name="customer" value={this.props.customer.nit}></Form.Control>
                    <Form.Label>SALES REPRESENTATIVE</Form.Label>
                    <Form.Control as="select" onChange ={(event) => this.updateValue(event)} name="salesRepresentative">
                        {salesRep}</Form.Control>
                    <Form.Label>PERCENTAGE</Form.Label>
                    <Form.Control type="number" readOnly name="visitsPercentage" value={this.props.customer.visitsPercentage}></Form.Control>
                    <Form.Label>NET</Form.Label>
                    <Form.Control type="number" onChange ={(event) => this.updateValue(event, this.props.customer)} name="net" value={this.state.visit.net}></Form.Control>
                    <Form.Label>AVAILABLE CREDIT</Form.Label>
                    <Form.Control type="number" readOnly name="availableCredit" value={this.props.customer.availableCredit}></Form.Control>
                    <Form.Label>VISIT TOTAL</Form.Label>
                    <Form.Control readOnly type="number" name="visitTotal" value={this.state.visit.visitTotal}></Form.Control>
                    <Form.Label>DESCRIPTION</Form.Label>
                    <Form.Control type="text" onChange ={(event) => this.updateValue(event)} name="description" value={this.state.visit.description}></Form.Control>
                </Modal.Body>
                <Modal.Footer>
                    <Button block variant="outline-success" onClick={() => {this.createVisit(this.props.customer, this.props.close)}}>Create Visit</Button>
                    <Button block variant="outline-info" onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default VisitForm;