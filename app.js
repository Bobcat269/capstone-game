/*Button Examples.............*/
const buttonElements = document.querySelectorAll('button');
const spanElements = document.querySelectorAll(`.count`);
const spanStock = document.querySelectorAll(`.inventory`)
const moneyElement = document.querySelector('#money');


const game = {
    monster: [
        {name: 'Bug', hp: 20, baseAtk: 1},
        {name: 'Code Moneky', hp: 40, baseAtk: 5}
    ],
    display: {
        Draw: 0,
        Disc: 0
    },
    card: [
        {id: 1, name: 'de-bug', text: 'deal 5 damage', dmg: 5, block: 0},
        {id: 2, name: 'NULL-ify', text: 'gain 6 block this turn', dmg: 0, block: 6}
    ],
    hand:[     
    ],
    deck:[1,1,1,1,1,2,2,2,2,2],
    drawPile:[],
    discPile:[],
    player: {name: '', hp: 50, blkAmount: 0, energy: 3 },
    enemy: {name: '', hp: 999, baseAtk: 50, dmg: 0},
    currentCard = null


}

function randomBoi(max) {
    return Math.floor(Math.random() * max); 
}

    /*loop through the array swapping with a randomly chosen array position each time.
    Thus simulating a shuffle effect. This is referred to as a Fisher-Yates shuffle.*/
function shuffle(myArray) {
    for(let i=0; i<myArray.length; i++) {
        j = randomBoi(myArray.length)
        myArray[i], myArray[j] = myArray[j], myArray[i]
    }
}

function draw(){
    //shuffle discard into drawpile if drawpile is empty
    if (game.drawPile.length === 0) {
        for(let i = 0; i<game.discPile.length; i++){
        game.drawPile[i]=game.discPile.pop()}
        shuffle(game.drawPile)
        }
    game.hand.push = game.drawPile.pop
    
}
//draw 4 cards at start of game/turn
function drawHand(){
    for(let i=0; i<4; i++){
        draw()
    }
}

//discards hand
function discard(){
 while(game.hand.length > 0){
    game.discPile.push = game.hand.pop
 }
}

//monster attack base plus the below number (5-15)
function getAtk() {
    return (randomBoi(11)+5)
}

function begin() {
    //Load deck to draw pile
    for(let i=0; i<game.deck.length; i++){
        game.drawPile[i]=game.deck[i]
    }
    //shuffle
    shuffle(game.drawPile)
    drawHand()
    //set enemy damage for next turn
    game.enemy.dmg = (game.enemy.baseAtk+getAtk())
}

//whether the card is an attack or block, this should
//perform its function
function playCard(x) {
    if(game.player.energy > 0 && game.card[x].dmg < game.enemy.hp){
    game.enemy.hp - game.card[x].dmg
    game.player.blkAmount+game.card[x].block
    game.player.energy--
    } else if(game.player.energy === 0) {
        alert("No Mana Error")
    } else {
        //Enhancement - Make a variable to track which monster we are on and increment it when defeating.
        //Then we can change these value assignments below to match
        alert(`You defeated the ${game.enemy.name}! /n After catching your breath you head to the next room where you find a new enemy`)
        game.enemy.name = game.monster[1].name
        game.enemy.baseAtk = game.monster[1].baseAtk
        game.enemy.hp = game.monster[1].hp
        game.enemy.dmg = (game.enemy.baseAtk+getAtk()) 
    }
}



//XXXXXXXXXXXXXCreate a catch case for player death and monster defeat 
//runs when player end their turn
function battle() {
    //subtract block from dmg
    if(game.enemy.dmg >= game.player.blkAmount) {
        game.enemy.dmg = game.enemy.dmg-game.player.blkAmount
    } else {
        game.enemy.dmg = 0
    }
    //deals remaining dmg to player
    if(game.enemy.dmg > 0 && game.enemy.dmg < game.player.hp) {
        game.player.hp-game.enemy.dmg
    } else {alert("Game Over: You were defeated")
        //XXXXXXXXXX Disable buttons
    }
    //cleanup phase, clear values
    game.player.blkAmount = 0
    game.enemy.dmg = 0
    //discard remaining cards
    for(let i=0; i< game.hand.length; i++){
        game.discPile.push = game.hand.pop
    }
    //draw new hand
    drawHand()


    


    game.enemy.dmg = (game.enemy.baseAtk+getAtk())
}






    
    buttonElements.forEach((button) => {

        button.addEventListener(`click`, (event) => {
    
            //because we gave IDs to rows, we are using IDs to pull 
            //their position
            //when we query them as an array (e.g. querySelectorAll)
            const rowID = event.target.parentElement.id.split('')[1];
    

const gameo = {
    ingredients: [
       {name: 'sauce', stock: 5, price: 3},
       {name: "meat", stock: 5, price: 5},
        {name: "dough", stock: 5, price: 2},
        {name: "oregano", stock: 5, price: 1},
        {name: "noodles", stock: 5, price: 2},
        {name: "bread", stock: 5, price: 3}
    ],
    foodOrders: [0],
    meals: [
        {name: "pizza", price: 10, sold: 0},    
        {name: "sub", price: 10, sold: 0},
        {name: "pasta", price: 10, sold: 0}
    ],
    cartArray: [0,0,0,0,0,0],
    money: 100,
    day: 0



