var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

// All data retrieved is property of NNZ, it will be used for non-commercial puposes.

BASE_PLAYER_URL = 'https://anzpremiership.co.nz/teams/team/player/ellen-halpenny';
BASE_TEAM_URL = 'https://anzpremiership.co.nz/teams/team/';

app.get('/scrape', function(req, res){
  // Scraping here
  testurl = 'https://anzpremiership.co.nz/teams/team/player/ellen-halpenny';

  request(testurl, function(error, response, html){
    // Check there are no errors
    if(!error){
      var $ = cheerio.load(html);
      var name, height, dob, positions, stats;
      var json = {name : "", height : "", dob : "", positions : "", stats : {
        rebounds : "",
        total_penalties : "",
        goal_attempts : "",
        deflections : "",
        rebounds : "",
        contact_penalties : "",
        matches_played : "",
        centre_pass_receives : "",
        obstruction_penalties : "",
        minutes_played : "",
        turnovers : "",
        goal_percentage : "",
        pickups : "",
        intercepts : "",
        goals : "",
        feeds : ""
      }}
      // GET NAME
      $('.player-name').filter(function(){
        var data = $(this);
        name = data.text().trim();
        json.name = name;
        console.log("Name: " + name);
      })
      // GET HEIGHT
      $('.bio-data').filter(function(){
        var data = $(this);
        height = data.last().last().text().split(":")[2].trim();
        json.height = height;
        console.log("Height: " + height);
      })
      // GET DATE OF BIRTH
      $('.bio-data').filter(function(){
        var data = $(this);
        dob = data.last().last().text().split(":")[1].trim().split(" ")[0].replace(/\n/g,"");
        json.dob = dob;
        console.log("Date of Birth: " + dob);
      })
      // GET POSITIONS
      $('.player-positions').filter(function(){
        var data = $(this);
        positions = data.children().text();
        json.positions = positions;
        console.log("Positions: " + positions);
      })
      // GET STATISTICS
      $('div[id="stats-season"] table tbody tr').each(function(){
        var data = $(this);
        var stat_name = data.text().replace(/\s/g,"").replace(/\d/g,"");
        var stat_value = data.text().replace(/\s/g,"").replace(/\D/g,"");
        // ----------------------------------
        // Figure out how to add this to the json variable
        // ----------------------------------
        console.log("Stats - Name: " + stat_name);
        console.log("Stats - Value:" + stat_value);
      })
    }
  })
})

app.listen('8081')

console.log('Port 8081 active');

exports = module.exports = app;
