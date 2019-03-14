import React from "react";
import {MDBRow, MDBCol, MDBIcon} from "mdbreact";
import wellnesswellbeing from '../../assets/img/present/wellnesswellbeing.jpg'
const About = () => {
    return (
        <section className="my-5 animated fadeIn">

            <h2 className="h1-responsive font-weight-bold text-center my-5">
                What we are doing ?
            </h2>
            <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                We try to understand people's mentality under their anonymity. We want to
                prevent a greater number of suicides in adults and children.<br/>
                We have a partnership with Samaritans, an organization that deals with people's
                problems and cares for a good way to solve them.<br/>
                We will redirect you to Samaritans if you want to talk with a real person.
            </p>
            <MDBRow>
                <MDBCol lg="6" md="6">
                    <MDBRow className="mb-3">

                        <img className="img-fluid" src={wellnesswellbeing} alt="WellBeing"/>

                    </MDBRow>
                    <MDBRow className="mb-5">
                        <MDBCol xl="12" md="12" size="10">
                            <h3 className="font-weight-bold mb-3">AI</h3>
                            <ul>
                                <li>
                                    <pre><h4>Who is Justin?</h4></pre>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <p className="grey-text desc">

                                                Justin is a chatbot that will have fun asking questions about your hobbies and
                                                emotional status, everything will only stay between you and Justin ... well just
                                                between you Justin will lose his memory as soon as you leave him. Your personal
                                                data will not be shared with us if you do not want to help us improve reports
                                                among young people such as the average of the sexes or the emotional state. Why
                                                an AI? A chatbox will always be indifferent to the people who talk to it, it
                                                will not criticize them like a human, it will not be able to create opinions
                                                about you to judge yourself. A chatbot will listen to you and make you feel at
                                                ease. It will ask you different questions as it will make you know yourself
                                                better.
                                            </p>
                                        </li>

                                    </ul>
                                </li>

                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="6" lg="6">
                    <MDBRow className="mb-3">
                        <MDBCol xl="12" md="12" size="10">
                            <h3 className="font-weight-bold mb-3">Safety</h3>
                            <ul>
                                <li>
                                    <p className="grey-text desc">
                                        Your identity will be kept secure. We do not use any database to store
                                        conversations. We try to make you more comfortable when you have a conversation.
                                        We will take some data, such as your test feedback to make an analysis of the
                                        behavior of more people, no one will know who you are all under anonymity with
                                        an ID instead of your name.
                                    </p>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol xl="12" md="12" size="10">
                            <h3 className="font-weight-bold mb-3">Trust</h3>
                            <ul>
                                <li>
                                    <p className="grey-text desc">
                                        We will never try to influence you in making decisions about yourself. You can
                                        put your trust in our answers, but you never have to feel compelled to listen to
                                        them, you have to make your own decision as you feel. We will only try to get
                                        you on the right way.
                                    </p>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </section>
    );
}
export default About;