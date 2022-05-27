const express = require('express');
let app = express();
const helper = require('../helpers/github.js');
const db = require('../database/index.js');
const axios = require('axios');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('this is the req.body:',  req.body);
  var username = req.body.term;
  console.log('this is username:', username);
  helper.getReposByUsername(username)
    .then(result => result.data.map(ele => (
      {
        repo_id: ele.id,
        user_id: ele.owner.id,
        repo_url: ele.html_url,
        repo_name: ele.name,
        username: ele.owner.login,
        size: ele.size,
        stargazers_count: ele.stargazers_count



      })
    ))
    .then(repos => {

      db.save(repos);
      res.send(repos);

    })
    // .then (()=> res.send('Sucess Posting the repos!'))
    .catch(err => console.log('Err posting the repos!!'))

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  return db.showTop25Data()
    .then(data => {
      console.log('top25dataRepo_name', data.map(ele=> ele.repo_name));

      res.send(data)})

    .catch(err => console.log('Err getting top 25 repos!'));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

