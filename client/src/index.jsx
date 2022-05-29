import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }


  componentDidMount() {
    this.displayRepos();
  }


  displayRepos() {
     axios.get('/repos')
      .then(repos => {
        this.setState({ repos: repos.data });

      })
      .then (() => console.log('Repos displayed! Current state repos:', this.state.repos))
      .catch(err => console.log('Err updating the states!!'));


  };

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {term: `${term}` })

      .then(result => {
        console.log('Finished search! This is all the repos', result); //30 repos
        // setTimeout(() => {this.displayRepos()}, 10);
        this.displayRepos(); // top 25 repos


      })
      .then ((res) => this.displayRepos())
      .catch(err => console.log('Err searching the term!!!'));
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));