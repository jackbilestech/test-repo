import * as creds from 'variables/Credentials'
import GitHub from 'github-api';

var git = new GitHub()
var colorRepo = git.getRepo('ozh','github-colors')

 class GitLayer{
  constructor(){
    this.isLoaded = this.loadHelpers()
    this.languageColors = {}
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
  getLanguageColor = (lang) => {    
    return (this.languageColors.hasOwnProperty(lang) != true ? 'black' : this.languageColors[lang].color)
  }
  loadHelpers = () =>{
    return colorRepo.getContents('master','colors.json').then((result) => {
      var decodeJSON = JSON.parse(this.__decodeContent(result))
      
      
      this.languageColors = decodeJSON

    })
  }
  __decodeContent(input){
    var output = null
    return output = window.atob(input.data.content) // Base64 decode
  }
}

export default new GitLayer()
