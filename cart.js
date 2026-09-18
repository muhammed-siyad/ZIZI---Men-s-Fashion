// ==========================================
// ZIZI - CART.JS
// ==========================================


// ==========================================
// GET CART
// ==========================================

function getCart() {

    return JSON.parse(localStorage.getItem("ziziCart")) || [];

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "ziziCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();

    let count = 0;

    cart.forEach(function (item) {

        count += Number(item.quantity);

    });


    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = count;

    }

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    // IMPORTANT:
    // Your cart.html uses cart-container

    const container =
        document.getElementById("cart-container");

    const totalElement =
        document.getElementById("cart-total");


    if (!container) {

        return;

    }


    const cart = getCart();


    // ======================================
    // EMPTY CART
    // ======================================

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>Your Cart is Empty</h2>

                <p>Add some products to your cart.</p>

                <button
                    onclick="window.location.href='index.html'">

                    Continue Shopping

                </button>

            </div>

        `;


        if (totalElement) {

            totalElement.textContent = "0";

        }


        updateCartCount();

        return;

    }


    // Clear old products

    container.innerHTML = "";


    let total = 0;


    // ======================================
    // DISPLAY PRODUCTS
    // ======================================

    cart.forEach(function (item, index) {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="cart-details">

                <h2>${item.name}</h2>

                <p>₹${item.price}</p>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${index}, 1)">

                        +

                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>


            <div class="item-total">

                ₹${itemTotal}

            </div>

        `;


        container.appendChild(cartItem);

    });


    // ======================================
    // UPDATE TOTAL
    // ======================================

    if (totalElement) {

        totalElement.textContent = total;

    }


    updateCartCount();

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(index, amount) {

    const cart = getCart();


    if (!cart[index]) {

        return;

    }


    cart[index].quantity =
        Number(cart[index].quantity) + amount;


    // If quantity becomes 0, remove product

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    const cart = getCart();


    if (!cart[index]) {

        return;

    }


    cart.splice(index, 1);


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is already empty!");

        return;

    }


    localStorage.removeItem("ziziCart");


    displayCart();

    updateCartCount();

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    // Show order message

    alert("Your order is proceeded!");


    // Clear cart

    localStorage.removeItem("ziziCart");


    // Update cart count

    updateCartCount();


    // Show empty cart

    displayCart();

}


// ==========================================
// LOAD CART
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);