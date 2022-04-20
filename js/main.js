document.querySelector('#dealCards').addEventListener('click', drawTwo)
document.querySelector('#dealWarCards').addEventListener('click', warWereDeclared)

if(!localStorage.getItem("deckID")){
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    localStorage.setItem("deckID", data.deck_id)
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}

function drawTwo(){
  let currentDeckId = localStorage.getItem("deckID")
  const url = `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=2`
  document.querySelector("#dealWarCards").classList.add("hidden")
  document.querySelector("#P1FaceUpCard2").classList.add("hidden")
  document.querySelector("#P1FaceUpCard3").classList.add("hidden")
  document.querySelector("#P1FaceUpCard4").classList.add("hidden")
  document.querySelector("#P2FaceUpCard2").classList.add("hidden")
  document.querySelector("#P2FaceUpCard3").classList.add("hidden")
  document.querySelector("#P2FaceUpCard4").classList.add("hidden")
  fetch(url)
.then(res => res.json())
.then(data => {
  console.log(data)
  document.querySelector("#P1FaceUpCard").src = data.cards[0].image
  document.querySelector("#P2FaceUpCard").src = data.cards[1].image
  let player1Value = convertToNum(data.cards[0].value)
  let player2Value = convertToNum(data.cards[1].value)
  if(player1Value > player2Value){
    document.querySelector("h3").innerText = "Player 1 Wins"
    document.querySelector("h3").style.color = "green"
  }else if(player1Value < player2Value){
    document.querySelector("h3").innerText = "Player 2 Wins"
    document.querySelector("h3").style.color = "red"
  }else {
    document.querySelector("h3").innerText = "Time for WAR!"
    document.querySelector("#dealWarCards").classList.toggle("hidden")
    document.querySelector("#dealCards").classList.add("hidden")

  }
  if((data.remaining < 8 && player1Value === player2Value) || data.remaining < 2){
    alert("Not enough cards to continue. Getting a new deck now.")
    localStorage.clear()
    location.reload()
  }
})
.catch(err => {
    console.log(`error ${err}`)
});

}
function convertToNum(val){
  if(val === "ACE"){
    return 14
  }else if(val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if (val === "JACK"){
    return 11
  }else {
    return Number(val)
  }
}

function warWereDeclared(){
  let currentDeckId = localStorage.getItem("deckID")
  document.querySelector("#P1FaceUpCard2").classList.add("hidden")
  document.querySelector("#P1FaceUpCard3").classList.add("hidden")
  document.querySelector("#P1FaceUpCard4").classList.add("hidden")
  document.querySelector("#P2FaceUpCard2").classList.add("hidden")
  document.querySelector("#P2FaceUpCard3").classList.add("hidden")
  document.querySelector("#P2FaceUpCard4").classList.add("hidden")
  document.querySelector("#dealCards").classList.remove("hidden")


  document.querySelector("#dealWarCards").classList.add("hidden")
  const url = `https://www.deckofcardsapi.com/api/deck/${currentDeckId}/draw/?count=8`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.querySelector("#P1FaceUpCard").src = data.cards[0].image
      document.querySelector("#P1FaceUpCard2").src = data.cards[1].image
      document.querySelector("#P1FaceUpCard2").classList.remove("hidden")
      document.querySelector("#P1FaceUpCard3").src = data.cards[2].image
      document.querySelector("#P1FaceUpCard3").classList.remove("hidden")
      document.querySelector("#P1FaceUpCard4").src = data.cards[3].image
      document.querySelector("#P1FaceUpCard4").classList.remove("hidden")
      document.querySelector("#P2FaceUpCard").src = data.cards[4].image
      document.querySelector("#P2FaceUpCard2").src = data.cards[5].image
      document.querySelector("#P2FaceUpCard2").classList.remove("hidden")
      document.querySelector("#P2FaceUpCard3").src = data.cards[6].image
      document.querySelector("#P2FaceUpCard3").classList.remove("hidden")
      document.querySelector("#P2FaceUpCard4").src = data.cards[7].image
      document.querySelector("#P2FaceUpCard4").classList.remove("hidden")

      let player1Value = convertToNum(data.cards[0].value)
      let player2Value = convertToNum(data.cards[4].value)
      if(player1Value > player2Value){
        document.querySelector("h3").innerText = "Player 1 Wins"
        document.querySelector("h3").style.color = "green"
      }else if(player1Value < player2Value){
        document.querySelector("h3").innerText = "Player 2 Wins"
        document.querySelector("h3").style.color = "red"

      }else{
        document.querySelector("h3").innerText = "Time for WAR!...again"
        document.querySelector("#dealCards").classList.toggle("hidden")
        document.querySelector("#dealWarCards").classList.toggle("hidden")
      }
    })
  }