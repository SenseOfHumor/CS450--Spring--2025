import React, { Component } from 'react';

class Skills extends Component {
    render(){
        return (
            <div className="s1">
                <h2 class="bold">{this.props.KeySkills.title}</h2>
                <div className="s1_c1">
                    <div className="s1_c1_c1">
                        <ul class="sk1">
                        <li>{this.props.KeySkills.content1}</li>
                        <li>{this.props.KeySkills.content2}</li>
                        </ul>
                        <ul class="sk2">
                        <li>{this.props.KeySkills.content3}</li>
                        <li>{this.props.KeySkills.content4}</li>
                        </ul>
                        <ul class="sk3">
                        <li>{this.props.KeySkills.content5}</li>
                        <li>{this.props.KeySkills.content6}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Skills;