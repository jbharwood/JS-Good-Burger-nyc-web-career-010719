let allBurgers = []
let burgerMenu = document.querySelector("#burger-menu")
let orderList = document.querySelector("#order-list")
let customBurger = document.querySelector("#custom-burger")

document.addEventListener("DOMContentLoaded", () => {
  getBurgers()

  burgerMenu.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.className == "button") {
      // debugger
      addToOrder(e.target.parentElement)
    }
  })

  customBurger.addEventListener("submit", (e) => {
    addCustomBurger(e.target)
  })

}) //DOMContentLoaded

function addCustomBurger(newBurger) {
  let bName = customBurger.querySelector("#burger-name").value
  let bDescription = customBurger.querySelector("#burger-description").value
  let bImage = customBurger.querySelector("#burger-image").value
  // debugger
  fetch(`http://localhost:3000/burgers`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: bName, description: bDescription, image: bImage})
  })
  .then(resp => resp.json)
  .then(function(burger) {
    addBurgerToPage(burger)
  })
}

function addToOrder(order) {
  let newOrder = order.querySelector(".burger_title")
  orderList.innerHTML += `${newOrder.innerHTML} <br>`
}

function getBurgers() {
  fetch(`http://localhost:3000/burgers`)
  .then(r => r.json())
  .then(function(parsed) {
    allBurgers = parsed
    addBurgersToPage(parsed)
  })
}

function addBurgersToPage(burgers) {
  burgers.forEach(function(burger) {
    addBurgerToPage(burger)
  })
}

function addBurgerToPage(burger) {
  burgerMenu.innerHTML += `
  <div class="burger" data-id = ${burger.id}>
    <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">
        ${burger.description}
      </p>
      <button class="button">Add to Order</button>
    </div>
  `
}
