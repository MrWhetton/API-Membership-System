const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const { cardID } = params
const quit = () => document.location = "/DemoCardList.html"
const heading = document.querySelector("h1")
const inputAmountValue = document.querySelector("#textval")

let currentEmployee = {}


  fetch(`/Employee?employeeID=${employeeID}`)
    .then(result => result.json())
    .then(employee => {
      currentEmployee = employee[0]
      heading.innerText = `${currentEmployee.name} please input amount you need?`
      console.log(currentEmployee.name)
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
}