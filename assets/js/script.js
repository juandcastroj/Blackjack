 const myModule = (() => {
    'use strict'

    let deck      = []
    const types   = ['C', 'D', 'H', 'S'],
         specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = []

    const btnGetCard = document.querySelector('#btnGetCard'),
         btnStopGame = document.querySelector('#btnStopGame'),
          btnNewGame = document.querySelector('#btnNewGame')

    const pointsHtml = document.querySelectorAll('strong'),
            divCards = document.querySelectorAll('.cardsDiv')
    

     const initialGame = ( numPlayers = 2 ) => {
        deck = createDeck()

        playersPoints = [];
        for( let i = 0; i< numPlayers; i++ ) {
            playersPoints.push(0);
        }
        
        pointsHtml.forEach( elem => elem.innerText = 0 );
        divCards.forEach( elem => elem.innerHTML = '' );

        btnGetCard.disabled   = false;
        btnStopGame.disabled = false;
     }

    //crear una nueva baraja
    const createDeck = () => {

        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type)
            }
        }
        for (let type of types) {
            for (let spe of specials) {
                deck.push(spe + type)
            }
        } 

        return  _.shuffle( deck )
    }
    

    const getCard = () => {
        if (deck.length === 0) {
            alert('No hay cartas en la baraja, dale Nuevo Juego')
        }  
  
        return deck.pop()
    }

    const valueCard = (card) => {

        const valor = card.substring(0, card.length - 1)
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1
    }

    const accumulatePoints = ( card, turn ) => {
        playersPoints[turn] = playersPoints[turn] + valueCard( card )
        pointsHtml[turn].innerText = playersPoints[turn]
        return playersPoints[turn]
    }

    const createCard = ( card, turn ) => {

        const imgCard = document.createElement('img')
        imgCard.src = `/assets/cartas/${card}.png`
        imgCard.classList.add('carta')
        divCards[turn].append( imgCard )
    }

    const winner = () => {
        const [ minScore, pcPoints ] = playersPoints

        setTimeout(() => {
            if (minScore === pcPoints) {
                alert('Empate')
            }
            else if ((minScore > 21)) {
                alert('Computadora gana')
            }
            else if ((pcPoints > 21)) {
                alert('GANASTE!!')
            }
            else {
                alert('Computadora gana')
            }
        }, 800);
    }

    const computerTurn = ( minScore ) => {

        let pcPoints = 0

        do {
            const card = getCard()
            pcPoints = accumulatePoints( card, playersPoints.length - 1 )
            createCard( card, playersPoints.length - 1 )
        }
        while ((pcPoints < minScore) && (minScore <= 21));

        winner()
    }

    btnGetCard.addEventListener('click', () => {

        const card = getCard(),
              playerPoints = accumulatePoints( card, 0 )

        createCard( card, 0 )

        if ( playerPoints > 21 ) {
            btnGetCard.disabled = true
            btnStopGame.disabled = true
            computerTurn( playerPoints )

        } else if (playerPoints === 21) {
            btnGetCard.disabled = true
            btnStopGame.disabled = true
            computerTurn( playerPoints )
        }
    })

    btnStopGame.addEventListener('click', () => {
        btnGetCard.disabled = true
        btnStopGame.disabled = true
        computerTurn( playersPoints[0] )
    })

    btnNewGame.addEventListener('click', () => {

        initialGame()
    })

    return {
        newGame: initialGame
    }
})()

