const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { 'useNewUrlParser': true, 'useUnifiedTopology': true, 'useFindAndModify': false, 'useCreateIndex': true});

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type: Number, unique: true, required: true, index: true},
  user_id: Number,
  repo_url: String,
  repo_name: String,
  username: String,
  size: Number,
  updated_at: String,
  stargazers_count: Number
});

repoSchema.index({repo_id: 1}, {unique: true});

// let contributorSchema = new mongoose.Schema({
//   repo_id: {type: Number, unique: true, required: true, index: true},
//   username: String,
//   contributors: [{name: String, contribution: Number}]
// })

let Repo = mongoose.model('Repo', repoSchema);
// let Contributor = mongoose.model('Contributor', contributorSchema);

let save = (dataArr) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //  Repo.insertMany(dataArr, {ordered: false})
  //   .then((res) => console.log('Sucess save the data to database!'))
  //   .catch(err => console.log('Err! Failed to save the data to the database!'))


  Repo.insertMany(dataArr, {'ordered': false}, (err, result) => {
    if(err) {
      console.log('Err! Failed to save the data to the database!');

    } else {
      console.log('Sucess save the data to database!');

    }

  });


}


 let showTop25Data = () => {
   return Repo.find({}).sort({'stargazers_count': -1}).limit(25);
 }

 let showAllUsers = () => {
   return Repo.distinct("username");
 }

module.exports.save = save;
module.exports.showTop25Data = showTop25Data;
module.exports.showAllUsers = showAllUsers;