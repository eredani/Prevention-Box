import React, {Component} from 'react';
import Justin from '../ChatBot/Bot';
import {MDBContainer} from 'mdbreact';
class HomePage extends Component {
    render() {
        return (
            <div className="animated fadeIn homdiv">
                <video width="100%" height="100%" autoPlay>
                <source src="/box.mp4" type="video/mp4"/>
                </video>
                <MDBContainer>
                    <Justin></Justin>
                    </MDBContainer>
            </div>
        )
    }
}
export default HomePage;
