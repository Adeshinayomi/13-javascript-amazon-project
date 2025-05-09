export let cart= JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [

  ];
}


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function calculateCartQuantity(){
  let cartQuantity=0

  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity
  })
  return cartQuantity
}
export function updateCartQuantity2(productId,newQuantity){
  cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
          cartItem.quantity=newQuantity;
      }
  })
  saveToStorage()
}
export function addToCart(productId,productQuantity){
    let matchingItem;
  const productQuantityNumber=Number(productQuantity)

    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem=cartItem
      }
    })
    if(matchingItem){
      matchingItem.quantity+=productQuantityNumber
    }else{
      cart.push({
        productId:productId,
        quantity:productQuantityNumber
      });
    }
    console.log(cart)

    saveToStorage();
  }


export  function removeFromCart(productId){
    const newCart=[]

    cart.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem)
      }
    })

    cart=newCart

    saveToStorage();
  }

  export  function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;


    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem=cartItem
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;


    saveToStorage();
  }
  
  export function loadCart(fun){
    const xhr=new XMLHttpRequest()
  
    xhr.addEventListener('load',()=>{
      console.log(xhr.response)
      fun();
    })
    xhr.open('GET', 'https://supersimplebackend.dev/cart')
    xhr.send()
  }

  export async function loadCartFetch(){
    const response=await fetch('https://supersimplebackend.dev/cart');

    const text=await response.text()
    console.log(text)
  }