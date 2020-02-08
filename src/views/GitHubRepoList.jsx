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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        repos : []
    };
  }
  componentDidMount() {
    fetch(`https://api.github.com/users/jackbilestech/repos`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({repos : result});
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState();
        }
      )
  }

  repoClicked = (repo,evt) => {
      if(repo.has_pages){
        window.location.href = (`http://${repo.owner.login}.github.io/${repo.name}`)
      }
      else{
        window.location.href = repo.html_url
      }
      
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
            <Row>
                {this.state.repos.map((value, index) => 
                    <Col onClick={this.repoClicked.bind(this,value)}>
                        <Card
                        title={value.name}
                        content = {
                            <span>{value.description}</span>
                        }
                        
                    />   
                    </Col>
                )}
            </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
