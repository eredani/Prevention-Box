import React, {Component} from 'react';
import Justin from '../ChatBot/Bot';

class HomePage extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <h1 className="text-center">The best box from the world</h1>
                <Justin></Justin>
            </div>
        )
    }
}
export default HomePage;
