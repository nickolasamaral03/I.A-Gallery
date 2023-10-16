const body = document.querySelector('body')
const shopping = document.querySelector('.icone-bag') //icone do menu
const closeShopping = document.querySelector('.closeShopping') //Fechando o menu
const list = document.querySelector('.list')
const listCard = document.querySelector('.listCard')
const total = document.querySelector('.total')
const quantity = document.querySelector('.quantity')

shopping.addEventListener('click', () => {
    body.classList.add('active')
})

closeShopping.addEventListener('click', () => {
    body.classList.remove('active')
})

let artes = [
    {
        id: 1,
        image: '1.JPG',
        price: 89 
    },
    {
        id: 2,
        image: '2.JPG',
        price: 219 
    },
    {
        id: 3,
        image: '3.JPG',
        price: 89 
    },
    {
        id: 4,
        image: '4.JPG',
        price: 99 
    },
    {
        id: 5,
        image: '5.JPG',
        price: 139
    },
    {
        id: 6,
        image: '6.JPG',
        price: 199 
    },
    {
        id: 7,
        image: '7.JPG',
        price: 109 
    },
    {
        id: 8,
        image: '8.JPG',
        price: 109 
    }
];

let listCards = []
function initApp(){
    artes.forEach((value, key) => {
        let newDiv = document.createElement('div')
        newDiv.classList.add('item')
        newDiv.innerHTML = `
        <img src='img/${value.image}'/>
         <div class="price">R$${value.price.toLocaleString()}</div>
         <button onclick="addToCard(${key})">Adicionar ao carrinho</button>
        `;
        list.appendChild(newDiv)
    })
}
initApp()  //OK

function addToCard(key){
    if(listCards[key] == null){ //This function will add an item to listCards only if it doesn't already exist, and if it does exist, it will update the quantity to 1.
        listCards[key] = JSON.parse(JSON.stringify(artes[key]))
        listCards[key].quantity = 1
}
reloadCard()

}

function reloadCard(){
    listCard.innerHTML = ''
    let count = 0
    let totalPrice = 0
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price //calculando valor total
        count = count + value.quantity //quantidade total

        if(value != null){ 
            let newDiv = document.createElement('li')
            newDiv.innerHTML = `
            <div class='tudo'>
            <div><img src='img/${value.image}'/></div>
            <div class="price-card">R$${value.price.toLocaleString()},00</div>
            <div>
            <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>            
            </div>
            </div>
            `
            listCard.appendChild(newDiv)
        }
    })

    total.innerHTML = totalPrice.toFixed(2)
    quantity.innerHTML = count
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key]
    }else{
        listCards[key].quantity = quantity
        listCards[key].price = quantity * artes[key].price;
    }
    reloadCard()
}



