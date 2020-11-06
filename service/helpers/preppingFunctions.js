const fs = require('fs');
let {playersDB, teamsDB, positionMap} = require('./preppingTools');

function points_pr_mill(player) {
  const ppm = parseFloat((player.total_points / player.now_cost) * 10);
  return ppm.toFixed(2);
}

function points_pr_game_pr_mill(player) {
  const ppgpm = parseFloat((player.points_per_game / player.now_cost) * 10)
  return ppgpm.toFixed(2);
}

function addTeamWritten(player) {
  const team = teamsDB.find(team => team.code === player.team_code);
  return team.name;
}

function addPosition(player) {
  const position = positionMap.find(pos => pos.code === player.element_type);
  return position.position;
}

function stringToFloat(player) {
  player.ep_next = parseFloat(player.ep_next);
  player.ep_this = parseFloat(player.ep_this);
  player.form = parseFloat(player.form);
  player.points_per_game = parseFloat(player.points_per_game);
  player.selected_by_percent = parseFloat(player.selected_by_percent);
  player.value_form = parseFloat(player.value_form);
  player.value_season = parseFloat(player.value_season);
  player.influence = parseFloat(player.influence);
  player.creativity = parseFloat(player.creativity);
  player.threat = parseFloat(player.threat);
  player.ict_index = parseFloat(player.ict_index);
  return player;
}

function prepPlayers() {
  playersDB.forEach(player => {
    player = stringToFloat(player);
    player.points_pr_mill = points_pr_mill(player);
    player.points_pr_game_pr_mill = points_pr_game_pr_mill(player);
    player.team_name = addTeamWritten(player);
    player.position = addPosition(player);
  });
  fs.writeFileSync('../data/elements_prepped.json', JSON.stringify(playersDB));
}

prepPlayers();
module.exports.prepPlayers = prepPlayers;