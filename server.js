const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const cors = require(`cors`);
const db = JSON.parse(fs.readFileSync('./data/elements_prepped.json'));

// Construct a schema, using GraphQL schema language
// API Endpoints and what they return:
const schema = buildSchema(`
  type Player {
    code: Int,
    cost_change_event: Int,
    cost_change_start: Int,
    element_type: Int,
    ep_next: Float, 
    ep_this: Float,
    event_points: Int,
    first_name: String,
    form: Float,
    id: Int,
    news: String,
    news_added: String,
    now_cost: Int,
    photo: String,
    points_per_game: Float,
    second_name: String,
    selected_by_percent: Float,
    special: Boolean,
    status: String,
    team: Int,
    team_code: Int,
    total_points: Int,
    transfers_in: Int,
    transfers_in_event: Int,
    transfers_out: Int,
    transfers_out_event: Int,
    value_form: Float,
    value_season: Float,
    web_name: String,
    minutes: Int,
    goals_scored: Int,
    assists: Int,
    clean_sheets: Int,
    goals_conceded: Int,
    own_goals: Int,
    penalties_saved: Int,
    penalties_missed: Int,
    yellow_cards: Int,
    red_cards: Int,
    saves: Int,
    bonus: Int,
    bps: Int,
    influence: Float,
    creativity: Float,
    threat: Float,
    ict_index: Float,
    influence_rank: Int,
    influence_rank_type: Int,
    creativity_rank: Int,
    creativity_rank_type: Int,
    threat_rank: Int,
    threat_rank_type: Int,
    ict_index_rank: Int,
    ict_index_rank_type: Int,
    corners_and_indirect_freekicks_order: Int,
    direct_freekicks_order: Int,
    penalties_order: Int,
    extra: String,
    points_pr_mill: Float,
    points_pr_game_pr_mill: Float,
    team_name: String,
    position: String,
  }

  type Query {
    getPlayer: Player,
    getPlayers (filter: String): [Player],
    getPlayersSorted(filter:String, sort:String): [Player],
    getPlayersSorted2(filter:String, sort:String, maxPrice:Int,minPrice:Int): [Player]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  getPlayer: () => {
    return {
      name: db[0].web_name,
      points: db[0].total_points,
      position: db[0].position,
    };
  },
  getPlayers: ({ filter }) => {
    const newArr = db.filter((el) => el.position === filter);
    return newArr.map((player) => {
      return {
        code: player.code,
        cost_change_event: player.cost_change_event,
        cost_change_start: player.cost_change_start,
        element_type: player.element_type,
        ep_next: player.ep_next,
        ep_this: player.ep_this,
        event_points: player.event_points,
        first_name: player.first_name,
        form: player.form,
        id: player.id,
        news: player.news,
        news_added: player.news_added,
        now_cost: player.now_cost,
        photo: player.photo,
        points_per_game: player.points_per_game,
        second_name: player.second_name,
        selected_by_percent: player.selected_by_percent,
        special: player.special,
        status: player.status,
        team: player.team,
        team_code: player.team_code,
        total_points: player.total_points,
        transfers_in: player.transfers_in,
        transfers_in_event: player.transfers_in_event,
        transfers_out: player.transfers_out,
        transfers_out_event: player.transfers_out_event,
        value_form: player.value_form,
        value_season: player.value_season,
        web_name: player.web_name,
        minutes: player.minutes,
        goals_scored: player.goals_scored,
        assists: player.assists,
        clean_sheets: player.clean_sheets,
        goals_conceded: player.goals_conceded,
        own_goals: player.own_goals,
        penalties_saved: player.penalties_saved,
        penalties_missed: player.penalties_missed,
        yellow_cards: player.yellow_cards,
        red_cards: player.red_cards,
        saves: player.saves,
        bonus: player.bonus,
        bps: player.bps,
        influence: player.influence,
        creativity: player.creativity,
        threat: player.threat,
        ict_index: player.ict_index,
        influence_rank: player.influence_rank,
        influence_rank_type: player.influence_rank_type,
        creativity_rank: player.creativity_rank,
        creativity_rank_type: player.creativity_rank_type,
        threat_rank: player.threat_rank,
        threat_rank_type: player.threat_rank_type,
        ict_index_rank: player.ict_index_rank,
        ict_index_rank_type: player.ict_index_rank_type,
        corners_and_indirect_freekicks_order:
          player.corners_and_indirect_freekicks_order,
        direct_freekicks_order: player.direct_freekicks_order,
        penalties_order: player.penalties_order,
        extra: player.extra,
        points_pr_mill: player.points_pr_mill,
        points_pr_game_pr_mill: player.points_pr_game_pr_mill,
        team_name: player.team_name,
        position: player.position,
      };
    });
  },
  getPlayersSorted: ({ filter, sort }) => {
    let newArr;
    if (filter === 'All') {
      newArr = db;
    } else {
      newArr = db.filter((player) => player.position === filter);
    }
    newArr = newArr.sort((a, b) => b[sort] - a[sort]);
    return newArr;
  },
  getPlayersSorted2: ({ filter, sort, maxPrice, minPrice }) => {
    let newArr;
    if (filter === 'All') {
      newArr = db;
    } else {
      newArr = db.filter((player) => player.position === filter);
    }
    newArr = newArr.filter((player) => player.now_cost < maxPrice);
    newArr = newArr.filter((player) => player.now_cost > minPrice);
    newArr = newArr.sort((a, b) => b[sort] - a[sort]);
    return newArr;
  },
};



const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4001);
console.log('Running a GraphQL API server at http://localhost:4001/graphql');
