import React, { Component } from 'react';
import './Card.css';
import axios from 'axios';
import '@material/card/dist/mdc.card.css';
import Spinner from '../Spinner/Spinner';
export default class Card extends Component{
  constructor(){
    super();
    this.state = {
        profile:'',
        username: '',
        avatar_url: null,
        html_url : null,
        loading:false,
        login:null,
        bio:'NA ',
        followers: '',
        following: '',
        public_repos: '',
        company: 'NA',
        email: 'NA',
        hide_all: false
    }
  }
handleChange = async (e) => {

    if(e.target.value === "") {
      this.setState({hide_all: true})
    }
    if(e.target.value.length === 1) {
      this.setState({hide_all: false})
    }
    this.setState({username: e.target.value})
    this.setState({loading:true});
    if(e.target.value!=null && e.target.value!==""){
    try {
      const res = await  axios.get('https://api.github.com/users/'+e.target.value);
      const { avatar_url, html_url, login, bio, followers, following, public_repos, company, email } = res.data;
      this.setState({profile: 'found'});
      this.setState({avatar_url: avatar_url});
      this.setState({html_url: html_url});
      this.setState({login: login});
      this.setState({bio: bio});
      if(email!=null){
      this.setState({company: company});
      this.setState({email: email});
      }
      this.setState({followers: followers});
      this.setState({following: following});
      this.setState({public_repos: public_repos});
    } catch (e) {
      this.setState({profile: null});
      this.setState({loading:false});
    } finally {
      this.setState({loading:false});
    }}
  }
  render() {
    const { login, bio, followers, following, public_repos, company, email, profile,  html_url,  } = this.state;
    let logins = null;
    let spinners  = null;
    let html_urls =  null;
    let images = null;

    if( profile == null) {
      spinners = <Spinner loading={this.state.loading}/>
    } else if( this.state.avatar_url!= null) {
      images = <img src={this.state.avatar_url} className="App-logo" alt="logo" />
    }
    if(html_url!=null) {
      html_urls =  <div><a href={html_url} className="App-logo" style={{color: 'cornflowerblue'}}> {html_url}</a></div>
    }

    if(login!= null) {
      logins = <div className="resultData"> 
            <p className="portfolio">Username -</p> <span>{login}</span><br/>
            <p className="portfolio">Bio - </p><span>{bio}</span><br/>
            <p className="portfolio">Profile Url - </p><span>{html_urls}</span>
            <p className="portfolio">Followers - </p><span>{followers}</span><br/>
            <p className="portfolio">Following - </p><span>{following}</span><br/>
            <p className="portfolio">Public Repos -</p><span> {public_repos}</span><br/>
            <p className="portfolio">Company -</p><span>{company}</span><br/>
            <p className="portfolio">Email - </p><span> {email}</span><br/>
        </div>
    }

    return (
      <div className="App">
        <header className="App-header">
        <div className="search-area">
          <h3> Enter <span className="github">Github</span> username to search profile</h3>
            <input
            type="text"
            className="text-search"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}/>
        {profile==null && <h2> No profile found!</h2>}
        </div>
        {!this.state.hide_all ?
          <div className="mdc-card card-1">
            {spinners}
            { images}
            { logins}
          </div>
          : ""
        }
        </header>
      </div>
    );
  }
}
