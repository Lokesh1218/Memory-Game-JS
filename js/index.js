(function(){
  
var Memory = {
  openedCards: [],

  init: function() {
    this.shuffle(cards);
    this.setup();
    this.binding();
  },

  setup: function() {
    this.openedCards = [];
    moves =0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.querySelector('.score-timer').innerHTML = hours + ' Hours ' + minutes + ' Minutes ' +  seconds +' Seconds';
    document.querySelector('.score-moves').innerHTML = moves;
    for ( i= 0; i < 3; i++) {
      stars[i].classList.add('checked');
    }

    clearInterval(timer);
    startTimer = false;
    
    const deck = document.querySelector('.deck');
    for (var i = 0; i < cards.length; i++) {
      deck.innerHTML = "";
      [].forEach.call(cards, function(item) {
          deck.appendChild(item);
      });
      cards[i].classList.remove("show", "flip", "match", "disabled");
    };
    this.shuffle(cards);
  },

  binding: function() {
    var memoryCards = document.querySelector('.deck');
    var classObj = this;
    memoryCards.addEventListener('click', function(event) {
      let id = event.target;

      if (id.tagName === 'LI') {
        classObj.cardClicked(id);
      }
    });

    var closeIcon = document.querySelector('.js-close-icon');
    closeIcon.addEventListener('click', function() {
      document.querySelector('.js-finished-game').classList.toggle('hide');
      classObj.setup();
    });

    var reloadButton = document.querySelector('#restartGame');
    reloadButton.addEventListener('click', function() {
      classObj.setup();
    });
  },

  cardClicked: function (id) {
    this.displayCard(id);
    this.cardOpen(id);
    this.isFinished();
    if (!startTimer) {
      startTimer = true;
      this.timerCounter();
    }
  },

  isFinished: function() {
    var stars;
    if (matchedCard.length === 16) {
      clearInterval(timer);
      document.querySelector('.finished-game').classList.toggle('hide');
      var moveCounter = document.querySelector('.moves-text-value');
      var timerCount = document.querySelector('.timer-value');
      timerCount.innerHTML = hours + ' Hours ' + minutes + ' Minutes ' +  seconds +' Seconds';
      moveCounter.innerHTML = moves;
      document.querySelector('.rating-final').innerHTML = document.querySelector('.ratings').innerHTML;
    }
  },

  timerCounter: function() {
    timer = setInterval(function() {
      document.querySelector('.score-timer').innerHTML = hours + ' Hours ' + minutes + ' Minutes ' +  seconds +' Seconds';
      seconds++;
      if (seconds == 60) {
          minutes++;
          seconds=0;
      }
      if (minutes == 60) {
          hours++;
          minutes = 0;
      }
    }, 1000);
  },

  moveCounter: function() {
      var classObj = this;
      moves++;
      document.querySelector('.score-moves').innerHTML = moves;
            
      if ( moves > 12 && moves <= 19 ){
        for( i= 0; i < 3; i++){
          if(i > 1){
              stars[i].classList.remove('checked');
          }
        }
      } else if (moves >= 20){
        for ( i= 0; i < 3; i++) {
          if (i > 0){
              stars[i].classList.remove('checked');
          }
        }
      }
  },

  displayCard: function(id) {
    id.classList.toggle("flip");
    id.classList.toggle("show");
    id.classList.toggle("disabled");
  },

  cardOpen: function(id) {
    openedCards = this.openedCards;
    this.openedCards.push(id);
    var len = openedCards.length;
    if (len === 2) {
      this.moveCounter();
      if (openedCards[0].type === openedCards[1].type) {
        this.matched();
      } else {
        this.unmatched();
      }
    }
  },

  matched: function () {
    openedCards = this.openedCards;
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "flip", "no-event");
    openedCards[1].classList.remove("show", "flip", "no-event");
    this.openedCards = [];
  },

  unmatched: function () {
    openedCards = this.openedCards;
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    var classObj = this;
    this.disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "flip", "no-event","unmatched");
        openedCards[1].classList.remove("show", "flip", "no-event","unmatched");
        classObj.enable();
        classObj.openedCards = [];
    },1100);
  },

  disable: function () {
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
  },

  enable: function() {
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
  },

  shuffle: function(array) {
    var counter = array.length, temp, index;
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  },

  buildHTML: function() {
    var frag = '';
    [].forEach.call(cardsHtml, function(v){
      let fontClass = 'fa ' + 'fa-' + v.name;
      frag += '<li class="card" data-id="'+ v.id +'" type="'+ v.name +'">\
      <i class="'+ fontClass +'">\
      </i>\
      </li>';
    });
    return frag;
   }
  };

  var cardsHtml = [
    {
      name: "diamond",
      id: 1
    },
    {
      name: "plane",
      id: 2
    },
    {
      name: "anchor",
      id: 3
    },
    {
      name: "bolt",
      id: 4
    }, 
    {
      name: "cube",
      id: 5
    },
    {
      name: "anchor",
      id: 3
    },
    {
      name: "leaf",
      id: 7
    },
    {
      name: "bicycle",
      id: 8
    },
    {
      name: "diamond",
      id: 1
    },
    {
      name: "bomb",
      id: 6
    },
    {
      name: "leaf",
      id: 7
    },
    {
      name: "bomb",
      id: 6
    },
    {
      name: "bolt",
      id: 4
    },
    {
      name: "bicycle",
      id: 8
    },
    {
      name: "cube",
      id: 5
    },
    {
      name: "plane",
      id: 2
    },
  ];
  
  let html = Memory.buildHTML(cardsHtml);
  var deck = document.querySelector('.deck');
  deck.innerHTML = html;
  let card = document.getElementsByClassName("card");
  let cards = [...card];
  var moves = 0;
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var timer;
  var startTimer = false;
  var matchedCard = document.getElementsByClassName("match");
  var stars = document.querySelectorAll(".fa-star");
    
  Memory.init();

})();