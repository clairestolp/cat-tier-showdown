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
  'player': {
    name: undefined,
    index: undefined,
    hp: undefined,
    attackPower: undefined
  },
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
      var cat = 'cat-' + i;
      catContainer
        .attr('id', cat)
        .addClass('img-container')
        .addClass('hvr-pulse-grow');
      catContainer.html(
        '<img src="'+ cats[i].img1 +'" alt="'+ cats[i].name + '">' +
        '<p>' + cats[i].name + '</p>'
      );
      contents.append(catContainer);
    }

    //add cats to html and sytle elements
    contents.addClass('layout');
    $('#game').append(contents);
  },
  "selectPlayer": function () {
    //stores the cat that the player selects
    var cats = showdown.catTier;
    var player = showdown.player;
    $('.img-container').each(function(index){
      $(this).on('click', function(){
        player.name = cats[index].name;
        player.index = index;
        player.hp = cats[index].hitPoints;
        player.attackPower = cats[index].attackPower;
        cats[index].dead = true;
        console.log(player);
        showdown.updateEnemies();
        return $('#game').empty();
      });
    });
  },
  "updateEnemies": function(){
    //updates the number of enemies remaining
    var cats = showdown.catTier;
    $.each(cats, function(index){
      if(!cats[index].dead){
        showdown.enemies.push(cats[index]);
      }
    });
    console.log('enemies remaining', showdown.enemies);
  },

};

$(document).ready(function() {
    showdown.initializeGame();
    showdown.selectPlayer();
    //find a way to make functions execute synchronously
    //looking into $.deffered();
    //look into modifying selectPlayer()
});
