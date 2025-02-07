import React, { Component } from 'react';

class PersonalProfile extends Component {
    render(){
        return (
            <div className="pp1">
                <h2 class="bold">{this.props.profile.title}</h2>
                <div className="pp1_c1">
                    <p>{this.props.profile.content}</p>
                </div>
            </div>
        );
    }
}

export default PersonalProfile;