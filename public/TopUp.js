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
  // Put Http request - to pull money
  // doesn't up the API though

  // https://membership-system-api-project.herokuapp.com/db.json ? 
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
  /*fetch('/employee' +currentEmployee.id, {
    method: 'PUT', 
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(employeeString + currentEmployee)
  })*/
  // see if this update the employee data in DB
  //.then (currentEmployee => this.setState(currentEmployee))
  // idea's 
  // update for employeeString
  // make fetch request for employeeString
  // currentEmpployee.money == currentBalance
}