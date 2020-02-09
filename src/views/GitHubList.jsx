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
import * as creds from "../variables/Credentials"
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
import GitLayer from "api/GitHubLayer.js"

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
        repos : []
    };
  }
  componentDidMount(){
    creds.githubAccount.map((user, index) => {
        GitLayer.getList(user).then((d) => {
            this.state.repos = this.state.repos.concat(d)
            
            this.setState(this.state.repos)
        })
      })

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
            <Row>
                {this.state.repos.map((value, index) =>
                    <Col onClick={this.repoClicked.bind(this,value)} md={4}>
                        <UserCard
                        bgImage="https://www.oecd.org/media/oecdorg/directorates/developmentco-operationdirectoratedcd-dac/fsd/fsdsliders/ODA-release-2019.jpg"
                        name={value.name}
                        avatar={value.owner.avatar_url}
                        description = {
                            <span>
                                {value.description}
                                <br></br>
                                <h4>Language: {value.language || 'Unkown'}</h4>
                                <span>
                                    <h3>Account: {value.owner.login}</h3>
                                </span>
                            </span>
                            
                        }
                        
                    />
                    </Col>
                )}
            </Row>
      </div>
    );
  }
}

export default List;
