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
import GitLayer from 'api/GitHubLayer.js'
import { Pie , Bar, defaults } from 'react-chartjs-2';

import avatar_url from "assets/img/default-avatar.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      profile : [{
        avatar_url : avatar_url
      }],
      analytics : {
        totalRepos : null,
        repos : [],
        graphData : {
          labels: [],
          datasets : [{
            data : [],
            backgroundColor: []
          }]
        }
      },
    };
    
  }
  componentDidMount() {


    var self = this
    var promises = []

    creds.githubAccount.map((username, index) => {
      promises[index] = GitLayer.getProfile(username) //Get all user profiles
    })

    Promise.all(promises).then(function(values) {
      values.map((result, index) => {
          self.setState(self.state.profile[index] = result)
          //Calculate analytics
          self.state.analytics.totalRepos = (self.state.analytics.totalRepos += result.public_repos)
      })
    }).then(GitLayer.isLoaded).then( () => {

      
      var promises = []
      self.state.profile.map((profile, index) => {
        promises[index] =  GitLayer.getList(profile.login)
      })

      Promise.all(promises).then(function(repos) {   
        repos.map((list, index) => {
          list.map((d, index) => {

            self.state.analytics.repos = self.state.analytics.repos.concat(d)
  
              var languageList = []
              var languageTracker = []
              var tracker = 0
              self.state.analytics.repos.map((repo,index) => {
                if(languageList.indexOf(repo.language) > -1){
                  var label = languageList[languageList.indexOf(repo.language)]
  
                  for(var ind in languageList){
                    if(label == languageTracker[ind].label){
                      languageTracker[ind].hits++;
                      self.state.analytics.graphData.datasets[0].data[ind] = languageTracker[ind].hits
                      self.state.analytics.graphData.datasets[0].backgroundColor[ind] = languageTracker[ind].color
                    }
                  }
                }
                else{
                  //New language          
                  languageList[tracker] = repo.language
                  
                  languageTracker[tracker] = {
                    label : (!repo.language? 'Not Recognised' : repo.language),
                    hits: 1,
                    color: GitLayer.getLanguageColor(repo.language)
                  }
  
                  self.state.analytics.graphData.labels[tracker] = languageTracker[tracker].label
                  self.state.analytics.graphData.datasets[0].data[tracker] = languageTracker[tracker].hits
                  self.state.analytics.graphData.datasets[0].backgroundColor[tracker] = languageTracker[tracker].color
                  tracker++;
                }
                
              })
  
              
  
          })
        })
        self.setState({analytics : self.state.analytics})
      })

    });
  }
  render() {
    return (
      <div className="content">
        
          <Row>
            
            <Col md={8}>
              
              <Card
                title="About Me"
                content = {
                  
                <span>{this.state.profile[0].bio}
                
                  <br></br>
                  <span> 
                    Public Repos:{this.state.analytics.totalRepos}
                  </span>
                  
                </span>
                }
              />
              
              <Card
                title="GitHub Analytics"
                content = {
                  <div>
                  <span>
                    This is a simple infographic showing various data from my production and hobby GitHub accounts.
                    <br></br>
                    It's interactive too! Give it a hover / tap (for the mobile)!
                  </span>
                  <br></br>
                  <Pie redraw={true} data={this.state.analytics.graphData} />
                  </div>
                  
                }
              />
              
            </Col>
            <Col md={4}> 
            { this.state.profile.map((value, index) =>
                <Col md={12}>
                  <UserCard
                    bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                    avatar={this.state.profile[index].avatar_url}
                    name={this.state.profile[index].name}
                    userName={this.state.profile[index].login}
                    description={
                      <span>
                        {this.state.profile[index].bio}
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
              )
            }
            </Col>
          </Row>
      </div>
    );
  }
}

export default UserProfile;
