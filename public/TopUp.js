const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let currentEmployee = {}

fetch(`/Employee?employeeID=${employeeID}`)
.then(result => result.json())
.then(employee => {
  currentEmployee = employee[0]
  heading.innerText = `${currentEmployee.name} please input amount you need?`
  console.log(currentEmployee.name)
})
