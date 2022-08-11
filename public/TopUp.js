debugger

const quit = () => {
  localStorage.clear()
  location = "/DemoCardList.html"
}
const employeeString = window.localStorage.getItem('currentEmployee')
  if (!employeeString)
    quit()
const heading = document.querySelector("h1")
const inputAmountValue = document.querySelector("#inputAmountValue")

const currentEmployee = JSON.parse(employeeString)
if (!currentEmployee)
  quit()

let currentBalance = currentEmployee.money

heading.innerText =`${currentEmployee.name} your current balance is £${currentBalance}`

const display = (digit) => inputAmountValue.value += digit
const clear = () => inputAmountValue.value = ""

const enter = () => {
  const money = inputAmountValue.value
  currentBalance += 1 * money 
  const MaxAmount = 50
  if (currentBalance  > MaxAmount){
    alert('input amount is over the personally limit')
    currentBalance -= 1 * money
    clear()
    return
  }
  // Put Http request - to pull money
  currentEmployee.money = currentBalance 
  fetch('/employee/' + currentEmployee.id, { 
    method: 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(currentEmployee)
  })
  .catch ((error) => {
    alert(`something went wrong please try again (${error.message})`)
  })
  .then (_ => {
    heading.innerText =`${currentEmployee.name} your current new balance is £${currentBalance}`
  })
  //.then(result => result.json())
  // update method to restful api 
  //not quite right!
  fetch(`/employee/` + currentEmployee.id,{
    method: 'Update',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(currentBalance)
  })
}