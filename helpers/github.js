const axios = require('axios');
const config = require('../config.js');

async function getReposByUsername(username){
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let page = 0;
  let totalData = [];
  let options = {
    url: `https://api.github.com/users/${username}/repos?page=${page}&per_page=100`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
//  return axios.get(options.url, options.headers);
  do{
    repo = await axios.get(options.url, options.headers);
    totalData = totalData.concat(repo.data);
    page++;
  }while(repo.data.length === 100 && page <= 2) // fetch the data up to 300 records.

  console.log('this is total data:', totalData.length);
  return totalData;


}

// const getContributorsByUsernameAndReponame = (username, reponame) => {
//   let options = {
//     url: `https://api.github.com/users/${username}/${reposname}/contributors`,
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': `token ${config.TOKEN}`
//     }
//   };
//   return axios.get(options.url, options.headers);

// }

module.exports.getReposByUsername = getReposByUsername;