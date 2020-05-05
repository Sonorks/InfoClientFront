import React, { Component } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import axios from 'axios';

class CustomerForm extends Component{

    state = {
        countries: [],
        states: [],
        cities: []
    }

    componentDidMount(){
        this.getCountries();
      }

    getCountries(){
        axios.get('https://info-client-10pearls.herokuapp.com/master/country')
        .then(response =>{
            console.log(response.data)
            this.setState({countries:response.data});
        })
        .catch(error =>{
            alert(error)
        })
    }

    getStatesByCountry(event){
        axios.get("https://info-client-10pearls.herokuapp.com/master/state/"+event.target.value)
        .then(response => {
            this.setState({states:response.data})
        })
        .catch(error => {
          console.log(error)
          alert(error.response.data)
        })
    }

    getCitiesByState(event){
        axios.get("https://info-client-10pearls.herokuapp.com/master/city/"+event.target.value)
        .then(response => {
            this.setState({cities:response.data})
        })
        .catch(error => {
            alert(error.response.data)
        })
    }
    render(){

        const style = this.props.actionDesc === "UPDATE" ? {display: 'none'} : {}
        let countries = null;
        let states = null;
        let cities = null;
        countries= (this.state.countries.map((country) => {
            return <option key= {country.code} value={country.code}>{country.description}</option>
        }));
        states = (this.state.states.map((state) =>{
            return <option key={state.code} value={state.code}>{state.description}</option>
        }))
        cities= (this.state.cities.map((city) => {
        return <option key={city.code} value={city.code}>{city.description}</option>
        }))
        return (
            <Modal show={true}>
                <Modal.Header>
                {this.props.actionDesc} CUSTOMER {this.props.customer.nit}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label style={style}>NIT</Form.Label>
                        <Form.Control  style={style} onChange = {this.props.updateValue} type="number" name="nit" value={this.props.customer.nit}></Form.Control>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control onChange = {this.props.updateValue} type="text" name="fullname" value={this.props.customer.fullname}></Form.Control>
                        <Form.Label>ADDRESS</Form.Label>
                        <Form.Control onChange = {this.props.updateValue} type="text" name="address" value={this.props.customer.address}></Form.Control>
                        <Form.Label>PHONE</Form.Label>
                        <Form.Control onChange = {this.props.updateValue} type="number" name="phone" value={this.props.customer.phone}></Form.Control>
                        <Form.Label>COUNTRY</Form.Label>
                        <Form.Control as="select" defaultValue="0" onChange = {this.props.updateValue} onClick={(event) =>this.getStatesByCountry(event)} type="text" name="country" value={this.props.customer.country}>
                            <option value="0">SELECT COUNTRY</option>
                            {countries}
                            </Form.Control>
                        <Form.Label>STATE</Form.Label>
                        <Form.Control as="select" onChange = {this.props.updateValue} onClick= {(event)=>this.getCitiesByState(event)} type="text" name="state" value={this.props.customer.state}>
                            <option value="0">SELECT STATE</option>
                            {states}
                            </Form.Control>
                        <Form.Label>CITY</Form.Label>
                        <Form.Control as="select"onChange = {this.props.updateValue} type="text" name="city" value={this.props.customer.city}>
                            <option value="0">SELECT CITY</option>
                            {cities}
                            </Form.Control>
                        <Form.Label>CREDIT LIMIT</Form.Label>
                        <Form.Control onChange = {this.props.updateValue} type="number" name="creditLimit" value={this.props.customer.creditLimit}></Form.Control>
                        <Form.Label>VISITS PERCENTAGE</Form.Label>
                        <Form.Control onChange = {this.props.updateValue} type="number" name="visitsPercentage" value={this.props.customer.visitsPercentage}></Form.Control>
                        <Form.Label>AVAILABLE CREDIT</Form.Label>
                        <Form.Control onChange = {this.props.updateValue} type="number" name="availableCredit" value={this.props.customer.availableCredit}></Form.Control>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.action}>{this.props.actionDesc}</Button>
                    <Button variant="secondary" onClick={this.props.cancel}>Cancel</Button> 
                </Modal.Footer>
            </Modal>
        );
    } 
}




export default CustomerForm;