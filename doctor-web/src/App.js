import React, { Component }from 'react';
import './App.css';
import DoctorList from './components/doctor-list';
import DoctorDetails from './components/doctor-details';
import DoctorForm from './components/doctor-form';
import { withCookies } from 'react-cookie';
var FontAwesome = require('react-fontawesome');

class App extends Component {

  state = {
    doctors: [],
    selectedDoctor: null,
    editedDoctor: null,
    token: this.props.cookies.get('dr-token')
  }
  
  
  componentDidMount(){
    if(this.state.token){
      fetch('http://127.0.0.1:8000/api/doctors/', {
        method: 'GET',
        headers: { 'Authorization': `Token ${this.state.token}` }
      }).then( resp => resp.json())
      .then( res => this.setState({doctors: res}))
      .catch( error => console.log(error))
    } else {
      window.location.href = '/';
    }
    
    
  }
  

  loadDoctor = doctor => {
    this.setState({selectedDoctor: doctor, editedDoctor: null});
  }

  doctorDeleted = selDoctor => {
    const doctors = this.state.doctors.filter( doctor => doctor.id !== selDoctor.id);
    this.setState({doctors: doctors, selectedDoctor: null});
  }

  editClicked = selDoctor => {
    this.setState({editedDoctor: selDoctor});
  }
  
  newDoctor = () => {
    this.setState({editedDoctor: {title: '', description: '',}});
  }

  cancelForm = () => {
    this.setState({editedDoctor: null});
  }

  addDoctor = doctor => {
    this.setState({doctors: [...this.state.doctors, doctor]});
  }

  render() {
    return (
      
    <div className="App">
        <h1>
          <FontAwesome name="clinic-medical" />
          <span>Doctor Rank</span>
        </h1>
        <div className="layout">
          <DoctorList doctors={this.state.doctors} doctorClicked={this.loadDoctor} token={this.state.token}
          doctorDeleted={this.doctorDeleted} editClicked={this.editClicked} newDoctor={this.newDoctor}/>
          
          <div>
            { 
            !this.state.editedDoctor ? 
              <DoctorDetails doctor={this.state.selectedDoctor} updateDoctor={this.loadDoctor} token={this.state.token}/> 
             : <DoctorForm doctor={this.state.editedDoctor} cancelForm={this.cancelForm} 
             addDoctor={this.addDoctor} editedDoctor={this.loadDoctor} token={this.state.token}/> 
            }</div>
             
          </div>


        </div>   
    
    );
  }
  

}

export default withCookies(App);
