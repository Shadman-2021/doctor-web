import React, { Component } from 'react';

class DoctorForm extends Component {

    state = {
        editedDoctor: this.props.doctor
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }

    inputChanged = event => {
        let doctor = this.state.editedDoctor;
        doctor[event.target.name] = event.target.value;
        this.setState({editedDoctor: doctor});
    }

    saveClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/doctors/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 658f95b36e025e98ec7805e18609a98c8bdd7f21' 
            },
            body: JSON.stringify(this.state.editedDoctor)
            }).then( resp => resp.json())
            .then( res => this.props.addDoctor(res))
            .catch( error => console.log(error))
    }

    updateClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${this.props.doctor.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token d4e0d3686c0106dc76d079a01613b0df105c01c6' 
            },
            body: JSON.stringify(this.state.editedDoctor)
            }).then( resp => resp.json())
            .then( res => this.props.editedDoctor(res))
            .catch( error => console.log(error))
    }

    render() {

        const isDiasabled = this.state.editedDoctor.title.length === 0 || 
                                this.state.editedDoctor.description.length === 0;
    
        return (
            <React.Fragment>
                <span>Title</span><br/>
                <input type="text" name="title" value={this.props.doctor.title} onChange={this.inputChanged}/><br/> 
                <span>Description</span><br/>
                <textarea name="description" value={this.props.doctor.description} 
                    onChange={this.inputChanged}/><br/>
                { this.props.doctor.id ?
                    <button className="button" disabled={isDiasabled} onClick={this.updateClicked}>Update</button> : 
                    <button className="button" disabled={isDiasabled} onClick={this.saveClicked}>Save</button> }
                &nbsp;
                <button className="button" onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        )
    }
}

export default DoctorForm;