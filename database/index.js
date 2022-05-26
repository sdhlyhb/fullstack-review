const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { 'useNewUrlParser': true, 'useUnifiedTopology': true, 'useFindAndModify': false, 'useCreateIndex': true});

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type: Number, unique: true, required: true},
  user_id: Number,
  repo_url: String,
  repo_name: String,
  username: String,
  size: Number,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (dataArr) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return Repo.insertMany(dataArr)
    .then(() => console.log('Sucess save the data to database!'))
    .catch(err => console.log('Err! Failed to save the data to the database!'))
}

module.exports.save = save;