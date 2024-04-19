const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

//Abrir o modal do carrinho
cartBtn.addEventListener("click", () => {
    updateCartModal()
    cartModal.style.display = "flex"
})

//Fechar modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

//fechar modal quando clicar no botão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

//adicionar itens no carrinho
menu.addEventListener("click", function(event){
    //console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        //Adicionar no carrinho
        addToCart(name, price)
    }

})

//Função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //se o item já existir, aumenta apenas a quantidade + 1
        existingItem.quantity += 1
        return
    }
    else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

   updateCartModal()
}


//atualiza carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class = "flex items-center justify-between">
                <div>
                    <p class = "font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class = "font-medium mt-2">R$ ${item.price.toFixed(2)}</p><br>
                </div>

                
                <button class = "remove-from-cart-btn" data-name= "${item.name}">
                    Remover
                </button>
                
            </div>
        `

        total += item.price*item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerText = cart.length
}

// remover o item do carrinho
cartItemsContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

//função para remover item do carrinho
function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if(index != -1){
        const item = cart[index]

        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

//trabalhando com a barra de digitar endereço
addressInput.addEventListener("input", function(event){
    let inputvalue = event.target.value; //pega o valor

    if(inputvalue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen()
    if(!isOpen){
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
            onClick: function(){} // Callback after click
          }).showToast();

        return; 
    } 
    
    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return
    }

    //enviar o pedido para API whatsapp
    const cartItems = cart.map((item)=> {
        return(
            `${item.name}, Quantidade: (${item.quantity}), Preço: R$ ${item.price} | `
        )
    }).join("") //junta tudo e tira do array. Faz com que a resposta seja um texto

    const message = encodeURIComponent(cartItems)
    const phone = "11969164136"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank") //api whats

    cart = []
    updateCartModal()
})


//validar se o restaurante está aberto
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours()
    return hora >= 18 && hora < 22 //true: restaurante aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen()

if(isOpen){
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
}
else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}
