const RPSResultDiv = document.querySelector('.RPSResult');
const RPSResult_ = document.querySelector('.rps_result');
const RPSplayerComputerPicks_ = document.querySelector('.rps_player_computer_picks');
const RPSScore_ = document.querySelector('.rps_score');

const rockButton = document.querySelector('#rock_button');
const paperButton = document.querySelector('#paper_button');
const scissorsButton = document.querySelector('#scissors_button');
const resetScoreButton = document.querySelector('#resetScoreButton');
const autoPlayButton = document.querySelector('#autoPlayButton');

let isAutoPlaying = false;
let intId = '';

const RPSButtons = [rockButton,paperButton,scissorsButton];
const values = ['Rock','Paper','Scissors'];

RPSButtons.forEach((v,i)=>{
  v.addEventListener('click',()=>{
    startGame(values[i]);
  })
})

resetScoreButton.addEventListener('click',()=>{
  resetScore();
})

autoPlayButton.addEventListener('click', ()=>{
  autoPlay();
})

const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

const functions = {
  
  pickOne (){
    const randomNum = Math.random()
    let computerChoice = '';
    if (randomNum>0 && randomNum<1/3){
      computerChoice = 'Rock'
    }
    else if (randomNum>1/3 && randomNum<2/3){
      computerChoice = 'Paper'
    }
    else if (randomNum>2/3 && randomNum<=1){
      computerChoice = 'Scissors'
    };
    return computerChoice;
  },
  
  startGame (playerChoice){
    const computerChoice = pickOne();
    let result = '';
    let playerChoiceTxt = '';
    let computerChoiceTxt = '';
    if (playerChoice==='Rock'){
      playerChoiceTxt = '✊';
      if (computerChoice==='Rock'){
        result='Tie';
        computerChoiceTxt = '✊';
      } else if (computerChoice==='Paper'){
        result='Loss';
        computerChoiceTxt = '✋';
      } else if (computerChoice==="Scissors"){
        result='Win';
        computerChoiceTxt = '✌️';
      };
    }else if (playerChoice==='Paper'){
      playerChoiceTxt = '✋';
      if (computerChoice==='Rock'){
        result='Win';
        computerChoiceTxt = '✊';
      }else if (computerChoice==='Paper'){
        result='Tie';
        computerChoiceTxt = '✋';
      }else if (computerChoice==='Scissors'){
        result='Loss';
        computerChoiceTxt = '✌️';
      };
    }else if (playerChoice==='Scissors'){
      playerChoiceTxt = '✌️';
      if(computerChoice==='Rock'){
        result='Loss';
        computerChoiceTxt = '✊';
      }else if (computerChoice==='Paper'){
        result='Win';
        computerChoiceTxt = '✋';
      }else if (computerChoice==='Scissors'){
        result='Tie';
        computerChoiceTxt = '✌️';
      };
    };
    if (result==='Win'){
        score.wins ++;
      } else if (result==='Loss'){
        score.losses ++;
      } else if (result==='Tie'){
        score.ties ++;
      };

    RPSResultDiv.classList.add ('RPSResultActive');
    RPSResult_.innerText = `It's a ${result}.`;
    RPSplayerComputerPicks_.innerHTML = `You <span class="playerChoiceEmoji">${playerChoiceTxt}</span> - <span class="computerChoiceEmoji">${computerChoiceTxt}</span> Computer`;
    
    RPSScore_.innerText = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;

    localStorage.setItem('score' , JSON.stringify(score));
    return;
  },

  resetScore () {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    RPSResultDiv.classList.remove('RPSResultActive');
    RPSResult_.innerText = '';
    RPSplayerComputerPicks_.innerText = '';
    RPSScore_.innerText = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
  },

  autoPlay () {
    if (isAutoPlaying === false){
      intId = setInterval(()=>{
        isAutoPlaying = true;
        const random = pickOne();
        startGame(random);
      }, 0);
    } else if (isAutoPlaying === true){
      isAutoPlaying = false;
      clearInterval(intId);
      RPSResultDiv.classList.remove('RPSResultActive');
      RPSResult_.innerText = '';
      RPSplayerComputerPicks_.innerText = '';
    }
  }

  };

const {pickOne, startGame, resetScore, autoPlay} = functions
RPSScore_.innerText = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
