import React, { Component } from 'react';

class Education extends Component {
    render(){
        return (
            <div className="e1">
                <div className="e1_c1">
                    <h2 class="bold">{this.props.education.title}</h2>
                </div>
                <div className="e1_c2">
                    <p class="bold">{this.props.education.bsInstitution}</p>
                    <p>{this.props.education.bsDegree}</p>
                    <p>{this.props.education.bsDate}</p>
                    <p>{this.props.education.bsGpa}</p>
                </div>
            </div>
        );
    }
}

export default Education;