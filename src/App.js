import React, { Component }from 'react';
import './App.css';
import DoctorList from './components/doctor-list';
import DoctorDetails from './components/doctor-details';
import DoctorForm from './components/doctor-form';
var FontAwesome = require('react-fontawesome');

class App extends Component {

  state = {
    doctors: [],
    selectedDoctor: null,
    editedDoctor: null
  }
  
  constructor(props){
    super(props);
    this.state = {
        doctors: [],
        isLoaded: false,
    }
};
  
  componentDidMount() {
    
    fetch('http://127.0.0.1:8000/api/doctors/', {
      method: 'GET',
      headers: {
         'Authorization': ' Token 658f95b36e025e98ec7805e18609a98c8bdd7f21' 
      }
    }).then( resp => resp.json())
      .then( res => this.setState({doctors: res}))
      .catch( error => console.log(error))
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
      
        <h2>
        
          <FontAwesome name="clinic-medical" />
          <span>Doctor Rank</span>
        </h2>
        
        <div className="layout">
          <DoctorList doctors={this.state.doctors} doctorClicked={this.loadDoctor}
          doctorDeleted={this.doctorDeleted} editClicked={this.editClicked} newDoctor={this.newDoctor}/>
          <div className="">
            { 
            !this.state.editedDoctor ? 
              <DoctorDetails doctor={this.state.selectedDoctor} updateDoctor={this.loadDoctor}/> 
             : <DoctorForm doctor={this.state.editedDoctor} cancelForm={this.cancelForm} 
             addDoctor={this.addDoctor} editedDoctor={this.loadDoctor}/> 
            }
             
          </div>


        </div>   
    </div>
    );
  }
  

}

export default App;
