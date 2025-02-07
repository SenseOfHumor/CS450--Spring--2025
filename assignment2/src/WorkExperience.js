import React, { Component } from 'react';

class WorkExperience extends Component {
    render(){
        return (
            <div className="we1">
                <h2 class="bold">{this.props.workExperience.title}</h2>
                <div className="we1_c1">
                    
                    <div className="we1_c1_c1">
                        <p class="bold">{this.props.workExperience.job1}</p>
                        <p>{this.props.workExperience.job1Content}</p>
                    </div>
                    <div className="we1_c1_c2">
                        <p class="bold">{this.props.workExperience.job2}</p>
                        <p>{this.props.workExperience.job2Content}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkExperience;