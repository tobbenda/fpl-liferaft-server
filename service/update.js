const remote = require('./helpers/getData');
const preppers = require('./helpers/preppingFunctions');

async function update(){
  await remote.getData();
  await preppers.prepPlayers();
}

update();