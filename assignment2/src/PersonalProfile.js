import React, { Component } from 'react';

class PersonalProfile extends Component {
    render(){
        return (
            <div className="pp1">
                <div className="pp1_c1">
                    <p class="bold">{this.props.profile.title}</p>
                    <p>{this.props.profile.content}</p>
                </div>
            </div>
        );
    }
}

export default PersonalProfile;