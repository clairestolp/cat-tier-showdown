//showdown object contains all game variables and functions
//catTier contains all character data and stats
//initializeGame() resets game and prompts user to select a character
var showdown = {
  'catTier': [
    {
      name: 'lynx',
      dead: false,
      hitPoints: 30,
      attackPower: [8,16,24,32,40],
      counterAttack: 0.1,
      img1: './assets/images/bobcat-black-silhouette.png',
      img2: './assets/images/bobcat.jpg'
    },
    {
      name: 'lion',
      dead: false,
      hitPoints: 45,
      attackPower: [10,20,30,40,50],
      counterAttack: 0.3,
      img1: './assets/images/african-lion-black-silhouette.png',
      img2: './assets/images/lion.jpg'
    },
    {
      name: 'cheetah',
      dead: false,
      hitPoints: 25,
      attackPower: [8,16,24,32,40],
      counterAttack: .05,
      img1: './assets/images/cheetah-black-silhouette.png',
      img2: './assets/images/cheetah.jpg'
    },
    {
      name: 'cougar',
      dead: false,
      hitPoints: 35,
      attackPower: [9,18,27,36,45],
      counterAttack: 0.2,
      img1: './assets/images/cougar-black-silhouette.png',
      img2: './assets/images/cougar.jpg'
    },
    {
      name: 'leopard',
      dead: false,
      hitPoints: 40,
      attackPower: [9,18,27,36,45],
      counterAttack: 0.25,
      img1: './assets/images/leopard-black-silhouette.png',
      img2: './assets/images/leopard.jpeg'
    },
    {
      name: 'jaguar',
      dead: false,
      hitPoints: 50,
      attackPower: [10,20,30,40,50],
      counterAttack: 0.5,
      img1: './assets/images/mountain-lion-black-silhouette.png',
      img2: './assets/images/jaguar.jpg'
    }
],
  'enemies': [],
  'player': undefined,
  'opponent': undefined,
  'initializeGame': function () {
    //resets game, adds characters, prompts user to select character.
    //clears game div
    $('#game').empty();
    var cats = showdown.catTier;

    //creates prompt
    var prompt = $('<p>');
    prompt.html('Welcome to Cat Tier Showdown! Choose your character to begin.');
    prompt.addClass('prompt-text');
    $('#game').append(prompt);

    //initialize cats
    var contents = $('<div>');
    for (var i=0; i< cats.length; i++){
      var catContainer = $('<div>');
      var img = $('<img>', {src:cats[i].img1, alt:cats[i].name});
      img.addClass('thumbnail-md');
      catContainer
        .val(cats[i])
        .addClass('img-container')
        .addClass('hvr-pulse-grow')
        .html(img)
        .append('<p>' + cats[i].name + '</p>');
      contents.append(catContainer);
    }

    //add cats to html and sytle elements
    contents.addClass('layout-select');
    $('#game').append(contents);
  },
  "selectPlayer": function (cat) {
    //stores the cat that the player selects
    showdown.player = cat;
    showdown.player.hitPoints = 100;
    cat.dead = true;
    showdown.updateEnemies();
    $('#game').empty();
  },
  "updateEnemies": function(){
    //updates the number of enemies remaining
    var cats = showdown.catTier;
    showdown.enemies = [];
    $.each(cats, function(index){
      if(!cats[index].dead){
        showdown.enemies.push(cats[index]);
      }
    });
    console.log('enemies remaining', showdown.enemies);
  },
  "setupMatch": function() {
    //instructions
    var prompt = $('<p>', {id:'prompt'});
    prompt
      .html('choose an opponent.')
      .addClass('prompt-text');
    $('#game').append(prompt);

    //add player
    var content = $('<div>', {id:'content'});
    var playerDiv = $('<div>', {id:'player'});
    var playerImg = $('<img>', {src: showdown.player.img2, alt: showdown.player.name});
    var playerHP = $('<div>');
    playerHP
      .html(`<p>HP: ${showdown.player.hitPoints}</p>`)
      .attr('id', 'playerHP')
      .addClass('text-stat text-md');

    playerDiv
      .append(playerImg)
      .append(playerHP);

    content
      .addClass('layout-battle')
      .append(playerDiv)
      .append($('<p>', {class: 'text-bg text-white'}).html('VS'));

    $('#game').append(content);
  },
  'generateEnemies': function () {
    var remaining = $('<div>', {id:'remaining'});
    remaining
      .addClass('text-white')
      .append('Remaining Enemies');
    $('#content')
      .append($('<div>', {id:'enemy'}))
      .append(remaining);
    $('#enemy')
      .html('<p class="text-white text-bg">???</p>')
    //generates remaining enemies
    $.each(showdown.enemies, function (index) {
      var enemy = showdown.enemies[index];
      var wrapper = $('<div>');
      var img = $('<img>', {src:enemy.img1, alt:enemy.name});

      wrapper
        .addClass('img-container hvr-pulse-grow text-black')
        .attr('value', index)
        .append(img)
        .append('<br>')
        .append(enemy.name);

      img
        .addClass('thumbnail-sm');

      $('#remaining')
        .addClass('vertical')
        .append(wrapper);
    });
  },
  "selectOpponent": function (opponent) {
    showdown.opponent = opponent;
    var opponentHP = $('<div>');
    //create new element to display hp
    opponentHP
      .html(`<p>HP: ${opponent.hitPoints}</p>`)
      .attr('id', 'enemyHP')
      .addClass('text-stat text-md');
    //append to enemy div
    $('#enemy')
      .empty()
      .append($('<img>', {src:opponent.img2, alt:enemy.name}))
      .append(opponentHP)
      //.addClass('animated bounce loopAnimation');
    $('#prompt').html('Click your opponent to attack');
    //disable click
    $.each(showdown.enemies, function () {
      $('.img-container')
        .off('click')
        .removeClass('hvr-pulse-grow')
        .css('background-color', 'rgba(192,192,192,0.5)')
        .css('color', '#ffffff');
    });
  },
  "attack": function (player, opponent) {
    //attack opponent
    opponent.hitPoints -= player.attackPower[0];
    //counter attack
    //calculate counterAttack val
    var countAtt;
    countAtt = Math.floor(opponent.counterAttack * player.hitPoints);
    console.log;
    player.hitPoints -= countAtt;
  },
  "animateAttack": function(player, opponent) {
    //fadeInUp message
    //display a message indicating the damage for 1 or 2 seconds, red background white text
    //fadeOutDown message

    var opponentHit = $('<div>');
    var playerHit = $('<div>');
    opponentHit 
      .attr('id', 'opponentHit')
      .addClass('hitBox text-bg animated fadeInUp')
      .html('-' + player.attackPower[0]);
    $('#enemy').append(opponentHit);
    setTimeout(function(){
      opponentHit
        .addClass('fadeOutDown');
    }, 2000);
    //fadeInUp message
    //display message indicating the damage for 1 or 2 seconds, red background white text
    //fadeInOut message

    playerHit
      .attr('id', 'playerHit')
      .addClass('hitBox text-bg animated fadeInUp')
      .html('-' + Math.floor(opponent.counterAttack * player.hitPoints));
    $('#player').append(playerHit);
    setTimeout(function(){
      playerHit
        .addClass('fadeOutDown');
    }, 2000);
  },
  "animateHP": function() {
    //enemy HP bounce
    setTimeout(function(){
      $('#enemyHP').addClass('animated bounce');
    }, 500);
    //player HP bounce
    setTimeout(function(){
      $('#playerHP').addClass('animated bounce');
    }, 500);

    setTimeout(function(){
      $('#enemyHP').removeClass('animated bounce');
      $('#playerHP').removeClass('animated bounce');
    }, 3000);
  },
  "match": function(player) {
      //generate enemies
      showdown.generateEnemies();
      //select an enemy set opponent
      $('.img-container').on('click', function () {
        var index = parseInt($(this).attr('value'));
        showdown.selectOpponent(showdown.enemies[index]);
        opponent = showdown.opponent;
        console.log('opponent', opponent);
      });
      //attack enemy, enemy counter attack, doc reloads on lose
      $('#enemy').on('click', function () {
        showdown.attack(player, opponent);
        showdown.animateAttack(player, opponent);
        
        //evaluate if player has hp left
        if(player.hitPoints > 0){
          $('#playerHP')
            .html(`HP: ${player.hitPoints}`);
          showdown.animateHP();
        }else{
          //player lost, document reloads
          $('#playerHP').html(`HP: 0`);
          alert('you lose');
          return location.reload();
        }
        //evaluate if enemy has hp
        if(opponent.hitPoints > 0){
          $('#enemyHP')
            .html(`HP: ${opponent.hitPoints}`);
        }else{
          //opponent is defeated
          $('#enemyHP').html(`HP: 0`);
          setTimeout(function(){alert('you win!');}, 0);
          //update catTier so opponent is dead
          showdown.catTier.forEach(function(cat){
            if (cat.name === opponent.name){
              cat.dead = true;
            }
          });
          //update enemies and clear content
          showdown.updateEnemies();
          $('#enemy').remove();
          $('#remaining').remove();
          //run again if enemies remain
          if(showdown.enemies.length > 0){
            return showdown.match(player, opponent);
          }else{
            alert('Cogratulations! you are now the strongest cat in the meta!');
          }
        }
      });
  }
};

$(document).ready(function() {
    showdown.initializeGame();
    var player, opponent;

    $('.img-container').on('click', function(){
      showdown.selectPlayer($(this).val());
      showdown.setupMatch();  
      player = showdown.player;    
      console.log('player', player);
      showdown.match(player, opponent);
    });
});
