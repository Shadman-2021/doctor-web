import React from 'react';
import { Card } from 'react-bootstrap';
var FontAwesome = require('react-fontawesome');

function DoctorList(props) {
    
    const doctorClicked = doctor => evt => {
            props.doctorClicked(doctor);  
    };

    const editClicked = doctor => {
        props.editClicked(doctor); 
    }

    const removeClicked = doctor => {
        fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${doctor.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token d4e0d3686c0106dc76d079a01613b0df105c01c6' 
            }
            }).then( resp => this.props.doctorDeleted(doctor))
            .catch( error => console.log(error))  
    };
    const newDoctor =() => {
        props.newDoctor();
    }

    return(
        <div>
            <h4>Doctor List </h4>
            <div className='item-container'>
            { props.doctors.map( doctor => {
                return (
                    <div   key={doctor.id} className="doctor-item">
                        <ul>
                            <li onClick={doctorClicked(doctor)}>
                                {doctor.title}
                            </li>
                            <FontAwesome name="edit" onClick={() => editClicked(doctor)}/>
                            <FontAwesome name="trash" onClick={() => removeClicked(doctor)}/>
                        </ul>
                    </div>
                    
                )
            })}
            </div>
            <button className="button" onClick={newDoctor}>Add Doctor</button>
        </div>
    )
}

export default DoctorList;