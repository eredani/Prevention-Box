import React, {Component} from 'react';
import Justin from '../ChatBot/Bot';
class HomePage extends Component {
    render() {
        return (
            <div className="animated fadeIn homdiv">
                <video width="500" height="500" autoPlay>
                <source src="/box.mp4" type="video/mp4"/>
                </video>
                <Justin></Justin>
            </div>
        )
    }
}
export default HomePage;
