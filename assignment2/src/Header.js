import React, { Component } from 'react';

class Header extends Component {
    render(){
        return(
            <div className='hd1'>
                <div className='hd1_c1'>
                    <div>
                        <h1 class="bold">{this.props.personInfo.name}</h1>
                        <h3 id="occ">{this.props.personInfo.occupation}</h3>
                    </div>
                </div>

                <div className='hd1_c2'>
                    <div>
                        <p>Email: <a class="link"href={`mailto:${this.props.contactInfo.email}`}>{this.props.contactInfo.email}</a></p>
                        <p>Web: {this.props.contactInfo.web}</p>
                        <p>Mobile: {this.props.contactInfo.mobile}</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Header;