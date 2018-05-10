//showdown object contains all game variables and functions
//catTier contains all character data and stats
//initializeGame() resets game and prompts user to select a character
var showdown = {
  'catTier': [
    {
      name: 'lynx',
      dead: false,
      hitPoints: 30,
      attackPower: [4,8,12,16,20],
      counterAttack: 12,
      img1: './assets/images/bobcat-black-silhouette.png',
      img2: './assets/images/bobcat.jpg'
    },
    {
      name: 'lion',
      dead: false,
      hitPoints: 45,
      attackPower: [7,14,21,28,35],
      counterAttack: 21,
      img1: './assets/images/african-lion-black-silhouette.png',
      img2: './assets/images/lion.jpg'
    },
    {
      name: 'cheetah',
      dead: false,
      hitPoints: 25,
      attackPower: [3,6,9,12,15],
      counterAttack: 9,
      img1: './assets/images/cheetah-black-silhouette.png',
      img2: './assets/images/cheetah.jpg'
    },
    {
      name: 'cougar',
      dead: false,
      hitPoints: 35,
      attackPower: [5,10,15,20,25],
      counterAttack: 15,
      img1: './assets/images/cougar-black-silhouette.png',
      img2: './assets/images/cougar.jpg'
    },
    {
      name: 'leopard',
      dead: false,
      hitPoints: 40,
      attackPower: [6,12,18,24,30],
      counterAttack: 18,
      img1: './assets/images/leopard-black-silhouette.png',
      img2: './assets/images/leopard.jpeg'
    },
    {
      name: 'jaguar',
      dead: false,
      hitPoints: 50,
      attackPower: [8,16,24,32,40],
      counterAttack: 24,
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
      .html('choose a challenger.')
      .addClass('prompt-text');
    $('#game').append(prompt);

    //add player
    var content = $('<div>', {id:'content'});
    var player = $('<div>', {id:'player'});
    var playerImg = $('<img>', {src: showdown.player.img2, alt: showdown.player.name});
    var playerHP = $('<div>');
    playerHP
      .html($(`<p id='playerHP'>HP: ${showdown.player.hitPoints}</p>`))
      .addClass('text-stat text-md');

    player
      .append(playerImg)
      .append(playerHP);

    content
      .addClass('layout-battle')
      .append(player)
      .append($('<p>', {class: 'text-bg'}).html('VS'))
      .append($('<div>', {id:'enemy'}));

    $('#game').append(content);
  },
  'generateEnemies': function () {
    var remaining = $('<div>', {id:'remaining'});
    remaining.append('Remaining Enemies');
    $('#content').append(remaining);

    //generates remaining enemies
    $.each(showdown.enemies, function (index) {
      var enemy = showdown.enemies[index];
      var wrapper = $('<div>');
      var img = $('<img>', {src:enemy.img1, alt:enemy.name});

      wrapper
        .addClass('img-container hvr-pulse-grow')
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
      .append($('<img>', {src:opponent.img2, alt:enemy.name}))
      .append(opponentHP);
    $('#prompt').html('Click your opponent to attack');
    //disable click
    $.each(showdown.enemies, function () {
      $('.img-container')
        .off('click')
        .removeClass('hvr-pulse-grow')
        .css('background-color', '#666');
    });
  },
  "attack": function (player, opponent) {
    //attack opponent
    opponent.hitPoints -= player.attackPower[0];
    //opponent counter attacks
    player.hitPoints -= opponent.counterAttack;
  }
};

$(document).ready(function() {
    showdown.initializeGame();
    var player, opponent;

    $('.img-container').on('click', function(){
      showdown.selectPlayer($(this).val());
      player = showdown.player;
      showdown.setupMatch();
      showdown.generateEnemies();
      console.log('player', player);

      while(showdown.enemies.length > 0){
        console.log(showdown.enemies);
        $('.img-container').on('click', function () {
          showdown.selectOpponent(showdown.enemies[parseInt($(this).attr('value'))]);
          opponent = showdown.opponent;
          console.log('opponent', opponent);
        });

        $('#enemy').on('click', function () {
          showdown.attack(player, opponent);
          if(player.hitPoints > 0){
            $('#playerHP').html(`HP: ${player.hitPoints}`);
          }else{
            $('#playerHP').html(`HP: 0`);
            alert('you lose');
          }

          if(opponent.hitPoints > 0){
            $('#enemyHP').html(`HP: ${opponent.hitPoints}`);
          }else{
            $('#enemyHP').html(`HP: 0`);
            alert('you win!');
            showdown.catTier.forEach(function(cat){
              if (cat.name === opponent.name){
                cat.dead = true;
              }
            });
            showdown.updateEnemies();
            $('#enemy').remove();
            $('#remaining').remove();
            showdown.generateEnemies();
          }
        });
      }


    });
});
