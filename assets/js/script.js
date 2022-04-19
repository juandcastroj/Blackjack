
let deck       = []
const types    = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']

playerPoints = 0
pcPoints     = 0

const btnGetCard         = document.querySelector('#btnGetCard')
const btnStopGame        = document.querySelector('#btnStopGame')
const btnNewGame         = document.querySelector('#btnNewGame') 

const pointsHtml         = document.querySelectorAll('strong')
const divCardPlayer      = document.querySelector('.cards-player')
const divCardComputer    = document.querySelector('.cards-computer')

//crear una nuvea baraja
const createDeck = () => {
    for ( let i = 2; i <= 10 ; i++) {
       for ( let type of types) {
           deck.push( i + type )
       }
    }
    for (let type of types) {
        for (let spe of specials) {
            deck.push( spe + type )
        }
    }
    //console.log(deck);
    deck = _.shuffle( deck )
    //console.log( deck );
    return deck
}
createDeck()

const getCard = () => {

    if ( deck.length === 0) {
        throw('no hay cartas en el deck')
    }
    const card = deck.pop()
    //console.log(card);
    return card
}


const valueCard = ( card ) => {

    const valor = card.substring(0, card.length - 1 )
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1
}

 const computerTurn = ( minScore ) => {
   
     do {
        const card = getCard()
        pcPoints = pcPoints + valueCard( card )        
        pointsHtml[1].innerHTML = pcPoints
    
       const imgCard = document.createElement('img')
       imgCard.src   = `/assets/cartas/${card}.png`
       imgCard.classList.add('carta')
       divCardComputer.append( imgCard )
      
     if ( minScore > 21 ) { break }
     }
     while ( ( pcPoints < minScore ) && ( minScore <= 21 ) );

    setTimeout(() => {
        if ( playerPoints === pcPoints ){
            alert('Empate')
     }
    else if ( ( minScore > 21 ) ) {
        alert('Computadora gana')
    }
    else if ( ( pcPoints > 21 ) ) {
    alert('GANASTE!!')
    }
    else{
        alert('Computadora gana')
    }
    }, 1000);
} 
    
btnGetCard.addEventListener('click', () => {
    
     const card   = getCard()
     playerPoints = playerPoints + valueCard( card )
     pointsHtml[0].innerHTML = playerPoints

    const imgCard = document.createElement('img')
    imgCard.src   = `/assets/cartas/${card}.png`
    imgCard.classList.add('carta')
    divCardPlayer.append(imgCard)
   
    if (playerPoints > 21 ) {
        btnGetCard.disabled = true
        btnStopGame.disabled = true
        computerTurn( playerPoints )
       

    }else if (playerPoints === 21 ) {
        btnGetCard.disabled = true
        btnStopGame.disabled = true
        computerTurn( playerPoints )
    }
 })

 btnStopGame.addEventListener('click', () => {
     btnGetCard.disabled  = true
     btnStopGame.disabled = true
     computerTurn( playerPoints )
 })

 btnNewGame.addEventListener('click', () => {
    
    btnGetCard.disabled = false
    btnStopGame.disabled = false
    
    deck = []
    playerPoints = 0
    pcPoints     = 0
    createDeck()

    pointsHtml[0].innerText='0' 
    pointsHtml[1].innerText='0'

    divCardComputer.innerHTML =''
    divCardPlayer.innerHTML   =''  
 })