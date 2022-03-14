import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');





class DoctorDetails extends Component {

    state = {
        highlighted: -1
    }

    highlightRate = high => evt => {
        this.setState({highlighted: high});
    }

    rateClicked = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${this.props.doctor.id}/rate_doctor/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 658f95b36e025e98ec7805e18609a98c8bdd7f21' 
            },
            body: JSON.stringify({stars: stars + 1})
            }).then( resp => resp.json())
            .then( res => this.getDetails())
            .catch( error => console.log(error))
    }
    
    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${this.props.doctor.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token d4e0d3686c0106dc76d079a01613b0df105c01c6' 
            }
            }).then( resp => resp.json())
            .then( res => this.props.updateDoctor(res))
            .catch( error => console.log(error))
    }

    render() {
        const mov = this.props.doctor;

        return (
            <React.Fragment>
                { this.props.doctor ? (
                    <div>
                        <h3>{mov.title}</h3>
                        <p>{mov.description}</p>
                        <FontAwesome name="star" className={mov.avg_rating > 0 ? 'yellow': ''} />
                        <FontAwesome name="star" className={mov.avg_rating > 1 ? 'yellow': ''}/>
                        <FontAwesome name="star" className={mov.avg_rating > 2 ? 'yellow': ''}/>
                        <FontAwesome name="star" className={mov.avg_rating > 3 ? 'yellow': ''}/>
                        <FontAwesome name="star" className={mov.avg_rating > 4 ? 'yellow': ''}/>
                        ({mov.no_of_ratings})
                        <div className="rate-container">
                            <h2>Rate This Doctor !!!</h2>
                            {[...Array(5)].map((e, i) => {
                                return <FontAwesome key={i} name="star" className={this.state.highlighted > i - 1 ? 'purple': ''} 
                                        onMouseEnter={this.highlightRate(i)} 
                                        onMouseLeave={this.highlightRate(-1)} 
                                        onClick={this.rateClicked(i)}
                                       />
                            } )}
                        </div>
                    </div>
                ) : null }
            </React.Fragment>
        )
    }
}

export default DoctorDetails;