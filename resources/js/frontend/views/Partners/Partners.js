import React, {Component} from 'react';

import {MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";

import amazon from '../../assets/img/partners/amazon.png'
import career from '../../assets/img/partners/career.png'
import lords from '../../assets/img/partners/lords.png'
import samaritans from '../../assets/img/partners/samaritans.png'
import sport from '../../assets/img/partners/sport.png'
import ukactive from '../../assets/img/partners/ukactive.png'

class Partners extends Component {
  render() {
    return (
      <MDBContainer className="text-center">
        <MDBRow>
          <MDBCol md="4">
            <MDBView hover zoom>
              <a href="//aws.amazon.com" ><img
                src={amazon}
                className="img-fluid"
                alt=""
              /></a>
            </MDBView>
          </MDBCol>
          <MDBCol md="4">
            <MDBView hover zoom>
              <a href="//www.careercolleges.org.uk/"><img
                src={career}
                className="img-fluid"
                alt=""
              /></a>
            </MDBView>
          </MDBCol>
          <MDBCol md="4">
            <MDBView hover zoom>
             <a href="//lords.org"> <img
                src={lords}
                className="img-fluid"
                alt=""
              /></a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <br/><br/><br/>
        <MDBRow>
          <MDBCol md="4">
            <MDBView hover zoom>
              <a href="//samaritans.org"><img
                src={samaritans}
                className="img-fluid"
                alt=""
              /></a>
            </MDBView>
          </MDBCol>
          <MDBCol md="4">
            <MDBView hover zoom>
            <a href="//sportengland.org"><img
                src={sport}
                className="img-fluid"
                alt=""
              /></a>
            </MDBView>
          </MDBCol>
          <MDBCol md="4">
            <MDBView hover zoom>
            <a href="//ukactive.com"><img
                src={ukactive}
                className="img-fluid"
                alt=""
              /></a>
            </MDBView>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Partners;
