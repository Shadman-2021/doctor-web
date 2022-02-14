import React from 'react';
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
                'Authorization': `Token ${this.props.token}` 
            }
            }).then( resp => this.props.doctorDeleted(doctor))
            .catch( error => console.log(error))  
    };
    const newDoctor =() => {
        props.newDoctor();
    }

    return(
        <div>
            { props.doctors.map( doctor => {
                return (
                    <div key={doctor.id} className="doctor-item">
                        <u1>
                            <li onClick={doctorClicked(doctor)}>
                                {doctor.title}
                            </li>
                            <FontAwesome name="edit" onClick={() => editClicked(doctor)}/>
                            <FontAwesome name="trash" onClick={() => removeClicked(doctor)}/>
                        </u1>    
                    </div>
                )
            })}
            <button className="button" onClick={newDoctor}>Add Doctor</button>
        </div>
    )
}

export default DoctorList;