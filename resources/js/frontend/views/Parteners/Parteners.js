import React, {Component} from 'react';

import {MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";

import amazon from '../../assets/img/parteners/amazon.png'
import career from '../../assets/img/parteners/career.png'
import lords from '../../assets/img/parteners/lords.png'
import samaritans from '../../assets/img/parteners/samaritans.png'
import sport from '../../assets/img/parteners/sport.png'
import ukactive from '../../assets/img/parteners/ukactive.png'

class Parteners extends Component {
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
             <a href="//lords.com"> <img
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
              <img
                src={samaritans}
                className="img-fluid"
                alt=""
              />
            </MDBView>
          </MDBCol>
          <MDBCol md="4">
            <MDBView hover zoom>
              <img
                src={sport}
                className="img-fluid"
                alt=""
              />
            </MDBView>
          </MDBCol>
          <MDBCol md="4">
            <MDBView hover zoom>
              <img
                src={ukactive}
                className="img-fluid"
                alt=""
              />
            </MDBView>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Parteners;
