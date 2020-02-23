let burgersArr = []
let burgerMenu = document.getElementById("burger-menu")
let orderList = document.getElementById("order-list")
let customBurgerForm = document.getElementById("custom-burger")

function renderBurgers(response){
  let burgerHtlmArr = 
    burgersArr.map(burger => {
     return `
    <div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">
      ${burger.description}
      </p>
      <button class="button" id= ${burger.id}>Add to Order</button>
    </div>
    `
    })
  burgerMenu.innerHTML = burgerHtlmArr.join("")
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/burgers")
  .then(response => response.json())
  .then(response => {
    burgersArr = response
    renderBurgers(response)
  })

    document.addEventListener("click", function(event){
      if(event.target.className === "button"){
        const foundBurger = burgersArr.find( burger =>  parseInt(event.target.id) === burger.id )
        const li = document.createElement("li")
        li.innerText = foundBurger.name
        orderList.append(li)
      }
    })

    document.addEventListener("submit", function(event){
      const newBurger = {
        name: customBurgerForm[0].value,
        description: customBurgerForm[1].value,
        image: customBurgerForm[2].value
      }
      fetch(`http://localhost:3000/burgers`, {
        method: 'POST',
        body: JSON.stringify(newBurger),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
})
