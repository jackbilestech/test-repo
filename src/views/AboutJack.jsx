/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar_url from "assets/img/default-avatar.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile : {
        avatar_url : avatar_url
      }
    };
  }
  componentDidMount() {
    fetch(`https://api.github.com/users/jackbilestech`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({profile: result});
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState(this.state.profile);
        }
      )
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="About Me"
                content = {
                <span>{this.state.profile.bio}
                <br></br>
                <span>Public Repos:{this.state.profile.public_repos}</span>
                </span>
               

                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={this.state.profile.avatar_url}
                name={this.state.profile.name}
                userName={this.state.profile.login}
                description={
                  <span>
                    One day, i’ll invent something useful. 
                    <br></br>
                    Until then, i’ll fix all the things broke in the process.
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-linkedin" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-github" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
