// debugger - to help test in source code on inspect on the hmtl
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const { cardID } = params
const quit = () => {
  localStorage.clear()
  alert(`Goodbye ${currentEmployee.name}`)
  location = "/DemoCardList.html"
}

const textvalInput = document.querySelector("#textval")
const heading = document.querySelector("h1")

let currentCard = {}
let currentEmployee = {}

if (!cardID)
  quit() 

else
  fetch(`/Card/${cardID}`)
    .catch(error => {
      //alert("Card need's to be registered")
      quit()
    })
    .then(result => result.json())
    .then(card => {
      currentCard = card
      const { employeeID } = currentCard
      return fetch(`/Employee/${employeeID}`)
      console.log(currentCard)
    })
    .then(result => result.json())
    .then(employee => {
      currentEmployee = employee
      heading.innerText = `Welcome ${currentEmployee.name} please input your PIN!`
      console.log(currentEmployee.name)
    })

setTimeout=(quit, 100 * 2 * 60)

const display = (digit) => {
  textvalInput.value += digit
  console.log('textvalInput.value', textvalInput.value)
}
const clear = () => {
  textvalInput.value = ""
  console.log('textvalInput.value', textvalInput.value)
}

const enter = () => {
  const pin = textvalInput.value
  const correctPIN = (currentCard.PIN == pin)
  // if pin is false
  if (!correctPIN)
    return clear()
  // if pin is correct
  localStorage.setItem('currentEmployee', JSON.stringify(currentEmployee))
  document.location = 'TopUp.html'
}




