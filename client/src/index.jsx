import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import AllUsers from './components/AllUSers.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      importedRepos: [],
      // reposBeforeNewSearch: [],
      // updatedRepos:[],
      AllAddedUsers:[]
    }

  }


  componentDidMount() {
    this.displayRepos();
    this.displayUsers();
  }


  displayRepos() {
     axios.get('/repos')
      .then(reposData => {

      this.setState({repos: reposData.data});

    })

      .then (() => {
        console.log('Repos displayed! Current state repos:', this.state.repos);
        this.forceUpdate();

        })
      .catch(err => console.log('Err updating the states!!'));


  }

  displayUsers() {
    axios.get('/repos/users')
      .then(responses => {
        console.log('this is the display user response:', responses);
        this.setState({AllAddedUsers: [...responses.data]});
      })
      .catch(err => console.log('err showing all the users!', err));
  }





  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {term: `${term}` })

      .then(result => {

        console.log('Finished search! This is all the repos', result); //30 repos at most
        this.setState({importedRepos: [...result.data]});

       this.displayRepos();
        this.displayUsers();
        this.forceUpdate();


      })
      .then ((response) => {this.displayRepos();  this.displayUsers(); this.forceUpdate();}) // don't know if this is kinda force another rendering.

      .catch(err => console.log('Err searching the term!!!'));
  }


  // checkUpdates(oldArr, newArr) {
  //     let stringifyOld = oldArr.map(ele => JSON.stringify(ele));
  //     let diffArr = newArr.filter(ele => stringifyOld.includes(JSON.stringify(ele))=== false);
  //     // this.setState({updatedRepos: diffArr});
  //     return diffArr;

  //   }






  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <span id="update-msg">
        {this.state.importedRepos.length} new repos fetched from API
        {/* ,  {this.state.updatedRepos.length} repos updated on this page! */}
      </span>
      <div id="box">
      <RepoList repos={this.state.repos}/>
      <AllUsers users = {this.state.AllAddedUsers}/>


      </div>

      <Search onSearch={this.search.bind(this)}/>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));