import * as creds from 'variables/Credentials'

 class GitLayer{
  constructor(){
    
  }
  getList = (user) => {
    return fetch(`${creds.githubApiEndpoint}/users/${user}/repos`).then(res => res.json()).then((result) => {
        return result
    })
  }
  getProfile = (user) => {
    return fetch(`${creds.githubApiEndpoint}/users/${user}`).then(res => res.json()).then((result) => {
      return result
  })
  }
}

export default new GitLayer()
