/*Button Examples.............*/
const blockElement = document.querySelector("#playerBlock");
const playerHPElement = document.querySelector("#playerHP");
const enemyAtkElement = document.querySelector("#enemyAtk");
const enemyNameElement = document.querySelector("#enemyName");
const enemyHPElement = document.querySelector("#enemyHP");
const cardElements = document.querySelectorAll(".cards");
const energyElement = document.querySelector("#energy");
const drawPileElement = document.querySelector("#drawPile");
const discPileElement = document.querySelector("#discPile");
const endButtonElement = document.querySelector("#endTurn");
let health = document.getElementById("healthBar");
let enemyHealth = document.getElementById("enemyBar");

//test button, comment out when deploying
// const testButtonElement = document.querySelector("#test");

/*Same rules as css, # for ID, . for class, or spell the element*/

const game = {
  monster: [
    { name: "Bug", hp: 40, baseAtk: 1 },
    { name: "Code Monkey", hp: 40, baseAtk: 5 }, //not in use in current version
  ],
  currentEnemy: 0,
  card: [
    {
      id: 0,
      name: "de-bug",
      text: "deal 5 damage",
      dmg: 5,
      block: 0,
      img: "assets/debug.png",
    },
    {
      id: 1,
      name: "NULL-ify",
      text: "gain 6 block this turn",
      dmg: 0,
      block: 6,
      img: "assets/nullify.png",
    },
  ],
  hand: [],
  deck: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  drawPile: [],
  discPile: [],
  player: { name: "", hp: 50, blkAmount: 0, energy: 3 },
  enemy: { name: "", hp: 999, baseAtk: 50, dmg: 0 },
};

//initialize monster
function genEnemy(x) {
  game.enemy.name = game.monster[x].name;
  game.enemy.hp = game.monster[x].hp;
  game.enemy.baseAtk = game.monster[x].baseAtk;
}

//pass me an integer, I will give you a random int from that array
//e.g. (If you pass 4, a random value from 0,1,2,3 will be returned.)
//i.e. THIS FUNCTION WON'T RETURN THE INTEGER YOU PASS BECAUSE ARRAYS BEGIN WITH 0
function randomBoi(max) {
  return Math.floor(Math.random() * max);
}

/*loop through the array swapping with a randomly chosen array position each time.
    Thus simulating a shuffle effect. This is referred to as a Fisher-Yates shuffle.
    Google told me how it works, but I built it here myself.*/
function shuffle(myArray) {
  for (let i = 0; i < myArray.length; i++) {
    j = randomBoi(myArray.length);
    [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
    // Debug Note: myArray[i], myArray[j] = myArray[j], myArray[i] doesn't work, NEEDS BRACKETS!
  }
}

//draws 1 card
function draw() {
  //shuffle discard into drawpile if drawpile is empty
  if (game.drawPile.length === 0) {
    console.log("recycling discard to draw");

    // for(let i = 0; i<game.discPile.length; i++){  fun bug
    while (game.discPile.length > 0) {
    //   console.log("Popping 1 to draw");
    //   console.log(`Discpile Length: ${game.discPile.length}`);

      game.drawPile.push(game.discPile.pop());
    }
    shuffle(game.drawPile);
  }
  console.log("Drawing 1");
  game.hand.push(game.drawPile.pop());
}

//draw 4 cards at start of game/turn (could be called whenever I suppose)
function drawHand() {
  for (let i = 0; i < 4; i++) {
    draw();
  }
}
//discards hand
function discard() {
  while (game.hand.length > 0) {
    game.discPile.push(game.hand.pop());
  }
}

//monster attack base plus the below number (5-15)
function getAtk() {
  return randomBoi(11) + 5;
}

//initializing function
function begin() {
  genEnemy(game.currentEnemy);
  //Load deck to draw pile
  for (let i = 0; i < game.deck.length; i++) {
    game.drawPile.push(game.deck[i]);
  }
  //shuffle drawPile
  shuffle(game.drawPile);
  // console.log(game.drawPile);
  drawHand();
  // console.log(game.hand);

  //set enemy damage for next turn
  game.enemy.dmg = game.enemy.baseAtk + getAtk();
  pushDisplay();
}
//whether the card is an attack or block, this should
//perform its function
function playCard(x, y) {
  if (game.player.energy > 0 && game.card[y].dmg < game.enemy.hp) {
    // console.log(`Damage: ${game.card[y].dmg}, Block: ${game.card[y].block}`);
    game.enemy.hp = game.enemy.hp - game.card[y].dmg;
    // console.log(`new enemy hp: ${game.enemy.hp}`);
    game.player.blkAmount = game.player.blkAmount + game.card[y].block;
    // console.log(`new player block: ${game.player.blkAmount}`);
    game.player.energy--;
    // console.log(`pushing card id: ${game.card[y].id}`);
    game.discPile.push(game.card[y].id); //put copy of card in discard pile
    // console.log(`Splicing hand position: ${game.hand[x]}`);
    game.hand.splice(x, 1); //remove card from hand
    // console.log(game.discPile);
  } else if (game.player.energy === 0) {
    alert("You don't have the enegry to play that card.");
  } else {
    //Enhancement - Make a variable to track which monster we are on and increment it when defeating.
    //Then we can change these value assignments below to match
    alert(`You defeated the ${game.enemy.name}! You win!`);
    genEnemy(1);
    game.enemy.dmg = game.enemy.baseAtk + getAtk();
  }
  pushDisplay();
}

function pushDisplay() {
  blockElement.textContent = game.player.blkAmount;
  playerHPElement.textContent = game.player.hp;
  health.value = game.player.hp;
  enemyAtkElement.textContent = game.enemy.dmg;
  enemyNameElement.textContent = game.enemy.name;
  enemyHPElement.textContent = game.enemy.hp;
  enemyHealth.value = game.enemy.hp;

  energyElement.textContent = game.player.energy;
  drawPileElement.textContent = game.drawPile.length;
  discPileElement.textContent = game.discPile.length;

  /*
    let health = document.getElementById("health")
health.value -= 10; //Or whatever you want to do with it. 
let enemyHealth = document.getElementById("enemyBar");
*/

  // console.log(cardElements[0].textContent);
  // console.log(game.hand[0]);

  // console.log(`Hand Length is: ${game.hand.length}`);

  for (let i = 0; i < game.hand.length || i < 4; i++) {
    //console.log('HELLO');
    //console.log(cardElements);
    //console.log(cardElements[i]);
    // console.log(`i:${i}`);
    // console.log(`game.hand[i]:${game.hand[i]}`);

    cardElements[i].textContent = game.hand[i]; //CHECK MEEEE
    if (
      cardElements[i].textContent === "1" ||
      cardElements[i].textContent === "0"
    ) {
      cardElements[i].style.backgroundImage = `url('${
        game.card[cardElements[i].textContent].img
      }')`; //I AM COOL
    } else {
      cardElements[i].style.backgroundImage = "url(/assets/nocard.png)";
    }
  }
}

//runs when player end their turn
function battle() {
  console.log(
    `enemy dmg: ${game.enemy.dmg}, player block: ${game.player.blkAmount}`
  );

  //subtract block from dmg
  if (game.enemy.dmg >= game.player.blkAmount) {
    game.enemy.dmg = game.enemy.dmg - game.player.blkAmount;
  } else {
    game.enemy.dmg = 0;
  }

  //deals remaining dmg to player
  if (game.enemy.dmg > 0 && game.enemy.dmg < game.player.hp) {
    game.player.hp = game.player.hp - game.enemy.dmg;
  } else if (game.enemy.dmg === 0) {
    console.log("Do Nothing");
  } else {
    alert("Game Over: You were defeated");
    //XXXXXXXXXX Disable buttons
  }
  //cleanup phase, clear values
  game.player.blkAmount = 0;
  game.enemy.dmg = 0;
  //discard remaining cards

  discard();
  console.log(`discard size: ${game.discPile.length}`);
  //draw new hand
  drawHand();
  //reset player energy
  game.player.energy = 3;
  game.enemy.dmg = game.enemy.baseAtk + getAtk();
}

/*--------------------------PROGRAM RUNS-----------------------------*/
// console.dir(cardElements[0]);

//verifying that the hand HTML elements will alway equal the array position of the card they represent
// cardElements.forEach(element => {
//     console.log(element.id)
// });

cardElements.forEach((card) => {
  card.addEventListener(`click`, () => {
    console.log(
      `passing cardid: ${card.id}, passing cardtext: ${card.textContent}`
    );

    playCard(card.id, card.textContent);
  });
});

// testButtonElement.addEventListener(`click`, () => {
begin();
// })

endButtonElement.addEventListener(`click`, () => {
  console.log("PUSH ME");

  battle();
  pushDisplay();
});
