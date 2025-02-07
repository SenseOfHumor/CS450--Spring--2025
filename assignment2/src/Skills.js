import React, { Component } from 'react';

class Skills extends Component {
    render(){
        return (
            <div className="s1">
                <div className="s1_c1">
                    <p class="bold">{this.props.KeySkills.title}</p>
                    <div className="s1_c1_c1">
                        <p>{this.props.KeySkills.content1}</p>
                        <p>{this.props.KeySkills.content2}</p>
                        <p>{this.props.KeySkills.content3}</p>
                        <p>{this.props.KeySkills.content4}</p>
                        <p>{this.props.KeySkills.content5}</p>
                        <p>{this.props.KeySkills.content6}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Skills;