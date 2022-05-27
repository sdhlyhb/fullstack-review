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

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {term: `${term}` })

      .then(result => {
        console.log('Finished search!', result); //30 repos
        axios.get('/repos').then(repos => {
          this.setState({repos: repos.data});
          console.log('Finished search and updated the states!', repos) //25 repos sorted by stargazers_count
        })

      })
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