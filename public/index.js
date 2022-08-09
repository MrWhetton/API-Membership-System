const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const {cardID} = params
const quit = () =>  document.location="/DemoCardList.html"
const textvalInput = document.querySelector("#textval")
const heading = document.querySelector("h1")

let currentCard = {} 
let currentEmployee = {}


if (!cardID){
  quit()
  return 
}

fetch (`/Card?CardID=${cardID}`)
.catch(error => {
  //Takes you back to the DemoCardList Screen
  quit()
})
.then(result => result.json())
.then(card => {
    currentCard = card
    const {employeeID} = card
    return fetch(`/Employee?employeeID=${employeeID}`)
})
.then(result => result.json())
.then(employee => {
  currentEmployee = employee
  heading.innerText=`Welcome ${employee.name} please input your PIN!`
})


const display = (digit) => textvalInput.value += digit 
const clear = () => textvalInput.value=""

const confirm = () => {
  const pin = textvalInput.value
  const correctPIN = (currentCard.PIN == pin)
  if (!correctPIN)
    return clear()
  
  // pin is correct
  window.localStorage['currentEmployee'] = JSON.stringify(currentEmployee)
  document.location = 'TopUp.html'
}


