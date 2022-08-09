const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const {cardID} = params

if (!cardID){
  document.location="/DemoCardList.html"
  return
}

fetch (`/Card?CardID=${cardID}`)
.catch(error => {
  document.location="/DemoCardList.html"
})
.then(result => result.json())
.then(card => {
  
})