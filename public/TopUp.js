debugger
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const { cardID } = params
const quit = () => document.location = "/DemoCardList.html"
const heading = document.querySelector("h1")
const inputAmountValue = document.querySelector("#money")

let currentEmployee = {}
let currentBalance = {}

// trying to fetch money from db.json // get request ?
  fetch(`/Employee?employeeID=${employeeID}`)
    .then( money => {
        currentBalance = money
        return fetch(`/Employee?money=${money}`)
      })
    .then(result => result.json())
    // trying to copy what i did on index.js
    .then(Totalbalance => {
      Totalbalance = currentBalance
      heading.innerText = `current balance on card is ${Totalbalance} `
    })

const display = (digit) => inputAmountValue.value += digit
const clear = () => inputAmountValue.value = ""

const enter = () => {
  const money = inputAmountValue.value
  const MaxAmount = 50
  if (money > MaxAmount)
  return 
    alert('input amount is over the personally limit')
    clear()

  // post request // the internet sucks on provide clear understanding of
  // post request without thrid party performing the it for you!!!!

  let updateOfBalance = await fetch('/employee/money',{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(money)
  })
}