const request = require('request');
const fs = require('fs');

let options = {json: true};
const url = 'http://fantasy.premierleague.com/api/bootstrap-static/'

const fileName = (dataCategory) => {
  const date = new Date();
  const day = date.getUTCDate();
  const month = date.getMonth();
  const hour = date.getUTCHours();
  const min = date.getUTCMinutes();
  
  return `../data/history/${dataCategory}_${day}_${month}_${hour}${min}.json`;
}

async function getData(){
  await request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };
    if (!error && res.statusCode == 200) {
      fs.writeFileSync(fileName('elements'), JSON.stringify(body.elements));
      fs.writeFileSync('../data/elements.json', JSON.stringify(body.elements));
      fs.writeFileSync(fileName('teams'), JSON.stringify(body.teams));
      fs.writeFileSync('../data/teams.json', JSON.stringify(body.teams));
    };
  });
}

async function motherFunction(){
  const data = await getData();
}
motherFunction();

module.exports.getData = motherFunction;