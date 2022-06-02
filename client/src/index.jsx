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
      updatedRepos:[]
    }

  }


  componentDidMount() {
    this.displayRepos();
  }


  displayRepos() {
     axios.get('/repos')
      .then(reposData => {
        let reposBeforeNewSearch = this.state.repos;
        let reposAfterNewSearch = reposData.data;
        let updated = this.checkUpdates(reposBeforeNewSearch, reposAfterNewSearch);
        // () =>{this.checkUpdates(reposBeforeNewSearch, reposAfterNewSearch), ()=> {this.setState(repos: reposData.data)}};

        this.setState({repos: reposData.data, updatedRepos: updated}, () => this.setState({reposBeforeNewSearch: this.state.repos}))
      })

      .then (() => {
        console.log('Repos displayed! Current state repos:', this.state.repos);

        })
      .catch(err => console.log('Err updating the states!!'));


  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {term: `${term}` })

      .then(result => {
        console.log('Finished search! This is all the repos', result); //30 repos at most
        this.setState({importedRepos: result.data});

        this.displayRepos(); // top 25 repos


      })
      .then ((res) => this.displayRepos())
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
        {this.state.importedRepos.length} new repos imported to database, {this.state.updatedRepos.length} repos updated on this page!
      </span>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <AllUsers />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));