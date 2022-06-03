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
      reposBeforeNewSearch: [],
      updatedRepos:[],
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
        let reposBeforeNewSearch = this.state.repos;
        let reposAfterNewSearch = reposData.data;
        let updated = this.checkUpdates(reposBeforeNewSearch, reposAfterNewSearch);
        this.setState(
          {repos: reposData.data, updatedRepos: updated},
          () => {setTimeout(() => {
          this.setState({reposBeforeNewSearch: reposAfterNewSearch});
        }, 1000 )
      }
      )})

      .then (() => {
        console.log('Repos displayed! Current state repos:', this.state.repos);

        })
      .catch(err => console.log('Err updating the states!!'));


  }

  displayUsers() {
    axios.get('/repos/users')
      .then(responses => {
        console.log('this is the display user response:', responses);
        this.setState({AllAddedUsers: responses.data});
      })
      .catch(err => console.log('err showing all the users!', err));
  }





  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {term: `${term}` })

      .then(result => {

        console.log('Finished search! This is all the repos', result); //30 repos at most
        this.setState({importedRepos: result.data});

        this.displayRepos(); // top 25 repos
        this.displayUsers();


      })
      .then (() => {this.displayRepos();  this.displayUsers();})

      .catch(err => console.log('Err searching the term!!!'));
  }


  checkUpdates(oldArr, newArr) {
      let stringifyOld = oldArr.map(ele => JSON.stringify(ele));
      let diffArr = newArr.filter(ele => stringifyOld.includes(JSON.stringify(ele))=== false);
      //this.setState({updatedRepos: diffArr});
      return diffArr;

    }






  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <span id="update-msg">
        {this.state.importedRepos.length} new repos fetched from API,  {this.state.updatedRepos.length} repos updated on this page!
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