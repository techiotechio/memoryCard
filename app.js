const cards = document.querySelectorAll('.card'); // selects all the divs and sets it to a variable: cards

let flipped = false; // setting a variable to not clicked as the default 
let lockBoard = false;
let card1;
let card2;

function flipcard(){
    if (lockBoard) return ;
    if (this === card1) return;

    this.classList.add('flip') //toggle removes flip class if it's there, adds if not.
                               //this in the current context represents the cards you click.

    if(!flipped){
        //first click
        flipped = true;
        card1 = this;
        
        return;
    } 

    // second click
        flipped = false;
        card2 = this;

        checkMatch()
        
  }


    function checkMatch(){
        // if the cards match remove the event listener, if not, flip back.
        let matched = card1.dataset.id === card2.dataset.id;
        
        matched ? disableCards() : unflipCards();

       
    }
            
    function disableCards(){
        card1.removeEventListener('click', flipcard)
        card2.removeEventListener('click', flipcard)

        resetBoard()
        }

    function unflipCards(){
        lockBoard = true; 

        setTimeout(() => {
          card1.classList.remove('flip');
          card2.classList.remove('flip');

        resetBoard();
        }, 1000);
        }
    
    
function resetBoard (){
    [flipped, lockBoard] = [false, false];
    [card1, card2] = [null, null]
}

(function shuffle (){
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 16);
        card.style.order = random;
    });
})();

cards.forEach(card => {
    card.addEventListener('click', flipcard)
})