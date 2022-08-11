debugger

const quit = () => {
  localStorage.clear()
  location = "/DemoCardList.html"
}
const employeeString = localStorage.getItem('currentEmployee')
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
const clearInput = () => inputAmountValue.value = ""

const enter = () => {
  const money = inputAmountValue.value
  currentBalance += 1 * money 
  const MaxAmount = 50
  if (currentBalance  > MaxAmount){
    alert('input amount is over the personally limit')
    currentBalance -= 1 * money
    clearInput()
    return
  }
  currentEmployee.money = currentBalance 
  fetch('/employee/' + currentEmployee.employeeID, { 
    method: 'PATCH',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({money: currentBalance})
  })
  .catch ((error) => {
    alert(`something went wrong please try again (${error.message})`)
  })
  .then (_ => {
    heading.innerText =`${currentEmployee.name} your current new balance is £${currentBalance}`
    localStorage.setItem('currentEmployee', JSON.stringify(currentEmployee))
    clearInput()
  })
}