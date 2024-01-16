//Model
const bigProductImg = document.querySelector('.product-big-img');
const lightBoxCanceller = document.querySelector('.light-box-x');
const lightBoxGalleryImgs = Array.from(document.querySelectorAll('.light-box-gallery-imgs'));
const lightBoxBigImg = document.getElementById('light-box-big-img');
const galleryImgs = Array.from(document.querySelectorAll('.gallery-img'));
const bigImg = document.getElementById('big-img');
const lightBoxContainer = document.querySelector('.light-box-container');
const decreaseBtn = document.querySelector('.decrease-btn');
const increaseBtn = document.querySelector('.increase-btn');
const orderQuantity = document.querySelector('.order-quantity-text');
const cartQuantity = document.querySelector('.cart-order-quantity');
const addToCartBtn = document.querySelector('.add-to-cart');
const cart = document.querySelector('.cart-container');
const orderInfo = document.querySelector('.order-info-container');
const ordersContainer = document.querySelector('.orders-container');
const toggleMenu = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-list');
const cancelBtn = document.querySelector('.fa-x');

//view 
function showLightBox(){
    lightBoxContainer.style.display = 'flex';
    lightBoxBigImg.src = bigImg.src;
}

function hideLightBox(){
    lightBoxContainer.style.display = 'none';
    bigImg.src = lightBoxBigImg.src;
}

function switchImg(img,nodeList,bigImg){
    const imgSrc = img.src.replace('-thumbnail','');
    bigImg.src = imgSrc;

    nodeList.forEach((image)=>{
        const parentElemnt = image.parentElement;
        parentElemnt.classList.remove('default');
    });

    img.parentElement.classList.add('default');

    if(nodeList === galleryImgs){
        lightBoxGalleryImgs.forEach((image)=>{
            const parentElemnt = image.parentElement;
            parentElemnt.classList.remove('default');
        });
        lightBoxGalleryImgs[nodeList.indexOf(img)].parentElement.classList.add('default');

    } if(nodeList === lightBoxGalleryImgs){
            galleryImgs.forEach((image)=>{
                const parentElemnt = image.parentElement;
                parentElemnt.classList.remove('default');
            });
            galleryImgs[nodeList.indexOf(img)].parentElement.classList.add('default');
        }
}

function decreaseOrder(){
    let orderQuantityValue = Number(orderQuantity.textContent);
    orderQuantityValue--;
    if(orderQuantityValue >= 0){
        orderQuantity.textContent = orderQuantityValue;
    }
}

function increaseOrder(){
    let orderQuantityValue = Number(orderQuantity.textContent);
    orderQuantityValue++;
    orderQuantity.textContent = orderQuantityValue;
}

function addOrder(){
    const numberedCartQuantity = Number(orderQuantity.textContent);
    if(numberedCartQuantity >= 100){
        cartQuantity.textContent = '+99';
    } else {
        const currentOrder = Number(cartQuantity.textContent);
        const newOrder = Number(orderQuantity.textContent);
        cartQuantity.textContent = currentOrder+newOrder;
    }
    const totalPrice = Number(cartQuantity.textContent)*125;
    orderInfo.innerHTML = `
        <div class="order-info">
            <div class="img-order">
                <img src="./imgs/image-product-1-thumbnail.jpg" src="sneaker image">
            </div>
            <div>
                <h4 class="order-details">
                    Fall limited edition sneakers
                    <div>
                        <span class="one-order-price">$125.00</span>
                        <span class="total-quantity">x ${cartQuantity.textContent}</span>
                        <span class="total-price">$${totalPrice}</span>
                    </div>
                </h4>
            </div>
            <div class="delete-order">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        </div>
        <div class="checkout-btn-container">
            <button class="checkout-btn">Checkout</button>
        </div>
    `;
    
    const totalQuantity = document.querySelector('.total-quantity');
    const decreaseTotalPrice = document.querySelector('.total-price');
    const deleteBtn = document.querySelector('.delete-order');
    deleteBtn.addEventListener('pointerup', deleteOrder.bind(null, totalQuantity, decreaseTotalPrice));
    orderQuantity.textContent = '0';
}

function deleteOrder(totalQuantity, totalPrice){
    let decreasedOrder = Number(cartQuantity.textContent);
    decreasedOrder--;
    if(decreasedOrder < 1){
        orderInfo.innerHTML =  `
            <div class="empty-cart">Your cart is empty</div>
        `;
        cartQuantity.textContent = decreasedOrder;
    } else {
        cartQuantity.textContent = decreasedOrder;
        totalQuantity.textContent = `x ${decreasedOrder}`;
        totalPrice.textContent = `$${decreasedOrder*125}`;
    }
}

//Controller
bigProductImg.addEventListener('click',showLightBox);

galleryImgs.forEach((galleryImg)=>{
    galleryImg.addEventListener('pointerup', switchImg.bind(null,galleryImg,galleryImgs,bigImg));
});

lightBoxGalleryImgs.forEach((lightBoxGalleryImg)=>{
    lightBoxGalleryImg.addEventListener('pointerup', switchImg.bind(null, lightBoxGalleryImg,lightBoxGalleryImgs,lightBoxBigImg));
});

lightBoxCanceller.addEventListener('pointerup', hideLightBox);

decreaseBtn.addEventListener('pointerup', decreaseOrder);
increaseBtn.addEventListener('pointerup', increaseOrder);

addToCartBtn.addEventListener('pointerup', addOrder);

cart.addEventListener('pointerup', ()=>{
    ordersContainer.classList.toggle('orders-container-show');
    if(cartQuantity.textContent === '0'){
        orderInfo.innerHTML = `
            <div class="empty-cart">Your cart is empty</div>
        `;
    } 
});

toggleMenu.addEventListener('touchend', ()=>{
    navList.classList.add('nav-list-toggle');
});

cancelBtn.addEventListener('touchend', ()=>{
    navList.classList.remove('nav-list-toggle');
});
