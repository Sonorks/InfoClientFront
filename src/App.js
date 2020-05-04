import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from './components/customer/Customer';
import CustomerForm from './components/customer/CustomerForm';
import CustomerActions from './components/customer/CustomerActions';
import axios from 'axios';
import Visit from './components/visit/Visit';
import VisitForm from './components/visit/VisitForm';
import {Table, Container, Button, Modal} from 'react-bootstrap';
import CreditChart from './components/reportes/CreditChart';
import VisitsPerCityChart from './components/reportes/VisitsPerCityChart';

class App extends Component{

  //fill state with REST getAll()
  state = {
    customers: [],
    showCustomers: true,
    showUpdateForm: false,
    showCreateForm: false,
    showCustomerActions: false,
    showVisits: false,
    customerToUpdate: {},
    newCustomer: {},
    visitsNit: {},
    visitsByCustomer: [],
    salesRep: [],
    visitsPerCity: [],
    showVisitsPerCity: false
  }

  componentDidMount(){
    this.getAllCustomers();
    this.getSalesRep();
  }

  getVisitsPerCity = () => {
    axios.get('http://localhost:8080/visit/city')
    .then(response => {
      this.setState({visitsPerCity:response.data})
    })
    .catch(error =>{
      alert(error.response.data)
    });
  }

  getSalesRep = () => {
    axios.get('http://localhost:8080/master/salesrep')
    .then(response => {
      this.setState({salesRep: response.data})
    })
    .catch(error =>{
      alert(error.response.data)
    });
  }

  getAllVisitsByCustomer = (customer) => {
    axios.get('http://localhost:8080/visit/nit/'+customer)
    .then(response => {
        this.setState({visitsByCustomer:response.data});
    })
    .catch(error =>{
      alert(error.response.data)
    });
 }

  getAllCustomers () {
    axios.get('http://localhost:8080/customer')
    .then(response => {
        this.setState({customers:response.data});
    })
    .catch(error =>{
      alert(error.response.data)
    });
 }

  showCustomer = () =>{
    this.getAllCustomers();
    this.setState({showCustomers: !this.state.showCustomers})
  }

  showUpdateForm = (customer) =>{
    this.setState({showCustomerActions:false})
    this.setState({showUpdateForm: true})
  }

  deleteCustomer = (nit) =>{
    axios.delete('http://localhost:8080/customer/'+nit)
    .then(response => {
      const index = this.state.customers.findIndex(c => {
        return c.nit === nit;
      })
      console.log(response.data)
      const customers = [...this.state.customers];
      customers.splice(index,1);
      this.setState({customers: customers})
    })
    .catch(error => {
      alert(error.response.data)
    })
    .finally(response =>{
      this.setState({showCustomerActions:false})
    })
  }

  updateCustomer = () =>{
    console.log(this.state.customerToUpdate)
    axios.put('http://localhost:8080/customer', this.state.customerToUpdate)
    .then(response => {
      this.getAllCustomers()
      this.setState({showUpdateForm: false});
    })
    .catch(error =>{
      alert(error.response.data)
    })
  }
  
  createCustomer = () => {
    axios.post('http://localhost:8080/customer', this.state.newCustomer)
    .then(response => {
      const customers = [...this.state.customers];
      customers.push(this.state.newCustomer);
      this.setState({customers: customers});
      this.setState({showCreateForm: false});
      alert(response.data)
    })
    .catch(error => {
      alert(error.response.data)
    })
  }

  updateValue = (event) => {
    const customer = this.state.customerToUpdate;
    if(event.target.name === "availableCredit"){
      alert("Available Credit can't be modified.")
    }
    else if(event.target.name === "phone" && event.target.value.length > 12){
        alert("PHONE CAN'T HAVE MORE THAN 12 DIGITS");
    }
    else {
      customer[event.target.name] = event.target.value;
      this.setState({customerToUpdate: customer});
    }
  }

  setNewValue = (event) => {
    const customer = this.state.newCustomer;
    if(event.target.name === "phone" && event.target.value.length > 12){
      alert("PHONE CAN'T HAVE MORE THAN 12 DIGITS")
    }
    else {
      customer[event.target.name] = event.target.value;
      this.setState({newCustomer: customer});
    }
  }

  showCustomerActions = (customer) => {
    let customerToUpdate = Object.assign({},customer);
    this.setState({customerToUpdate: customerToUpdate})
    this.setState({showCustomerActions:true})
  }

  goBackUpdateForm = () => {
    this.setState({showUpdateForm: false})
    this.setState({showCustomerActions: true})
  }

  showVisits = (nit) => {
    console.log("showingVisits for nit "+nit)
    this.getAllVisitsByCustomer(nit);
    this.setState({showCustomerActions:false})
    this.setState({showVisits:true});
    this.setState({visitsNit:nit});
  }

  getSalesRepName = (code) => {
    const index = this.state.salesRep.findIndex(sp => {
      return sp.code === code;
    })
    return this.state.salesRep[index].name
  }

  createVisit = () => {
    this.setState({showVisitForm:true})
  }

  closeVisitForm = () => {
    this.setState({showVisitForm:false});
    this.getAllCustomers();
  }

  showReportVisitsByCity = () => {
    this.setState({showVisitsPerCity:!this.state.showVisitsPerCity});
  }


  render() {
    let customers = null;
    let customerForm = null;
    let customerActions = null;
    let visits = null;
    let visitForm = null;
    let visitsPerCityChart = null;
    if(this.state.showVisitsPerCity){
      this.getVisitsPerCity();
      visitsPerCityChart = 
        <VisitsPerCityChart visitsPerCity={this.state.visitsPerCity} />
    }
    customers = (            
          this.state.customers.map((customer, index) => {
          return <Customer 
            key={customer.nit}
            customer={customer}
            showCustomerActions={() => this.showCustomerActions(customer)}/>
      }));
    if(this.state.showCustomerActions){
      customerActions = (
        <CustomerActions 
          deleteCustomer={() => this.deleteCustomer(this.state.customerToUpdate.nit)}
          updateCustomer={() => this.showUpdateForm(this.state.customerToUpdate)}
          createVisit={() => this.createVisit()}
          showVisits={() => this.showVisits(this.state.customerToUpdate.nit)}
          close={() => this.setState({showCustomerActions:false})}
        />
      )
    }
    if(this.state.showUpdateForm) {
      console.log("showing update Form")
      customerForm = (
        <CustomerForm customer = {this.state.customerToUpdate} 
        actionDesc = "UPDATE"
        updateValue = {(event) => this.updateValue(event)}
        action={()=>this.updateCustomer()}
        goback={()=>this.goBackUpdateForm()}
        cancel={() =>this.setState({showUpdateForm: false})}/>
      );
    }
    if(this.state.showCreateForm){
      customerForm = (
        <CustomerForm customer = {this.state.newCustomer} 
        actionDesc = "CREATE"
        updateValue = {(event) => this.setNewValue(event)}
        countries={this.state.countries}
        action={()=>this.createCustomer()}
        cancel={() => this.setState({showCreateForm: false})}/>
      );
    }
    if(this.state.showVisits){
      let visitsDetail = this.state.visitsByCustomer.map((visit, index) => {
        let salesRepName = this.getSalesRepName(visit.salesRepresentative)
        console.log(salesRepName)
        return <Visit key= {index} visit={visit} salesRep={salesRepName} />
      })
      visits = (
        <Modal show={true} size="lg">
          <div className="App"><h1>VISITS</h1></div>
          <Container>
              <Container>
              <CreditChart 
                availableCredit = {this.state.customerToUpdate.availableCredit}
                usedCredit = {this.state.customerToUpdate.creditLimit - this.state.customerToUpdate.availableCredit}
              />
              </Container>
              <Table striped bordered hover responsive>
                  <tbody>
                      <tr>
                          <th>DATE</th>
                          <th>SALES REPRESENTANTIVE</th>
                          <th>NET</th>
                          <th>VISIT TOTAL</th>
                          <th>DESCRIPTION</th>
                      </tr>
                      {visitsDetail}
                  </tbody>
              </Table>
          </Container>
          <Modal.Footer>
            <Button block variant="outline-info" onClick={() => {this.setState({showVisits:false})}}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    if(this.state.showVisitForm){
      visitForm = (
        <VisitForm customer = {this.state.customerToUpdate}
        salesReps = {this.state.salesRep}
        close={() => this.closeVisitForm()}/>
      )
    }
    return (
      <div className="App">
        <h1>CUSTOMERS</h1>
        <p/><p/><p/>
        {customerForm}
        {customerActions}
        {visits}
        {visitForm}
        <Button variant="success" onClick={()=>this.setState({showCreateForm:true})}>CREATE CUSTOMER</Button><p/><p/><p/>
        {visitsPerCityChart}
        <Button variant="info" onClick={this.showReportVisitsByCity}>SHOW REPORT VISITS BY CITY</Button>
        <p/><p/><p/><p/>
        <Container>
          <Table striped bordered hover responsive size="sm">
            <tbody>
              <tr>
                <th>NIT</th>
                <th>FULLNAME</th>
                <th>ADDRESS</th>
                <th>PHONE</th>
                <th>CITY</th>
                <th>STATE</th>
                <th>COUNTRY</th>
                <th>CREDIT LIMIT</th>
                <th>AVAILABLE CREDIT</th>
                <th>VISITS PERCENTAGE</th>
              </tr>
              {customers}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App;
