// ==========================================
// ZIZI WEBSITE - COMPLETE JAVASCRIPT
// ==========================================


// ==========================================
// SHOP NOW / SCROLL
// ==========================================

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ==========================================
// LOGIN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const username =
                document.getElementById("username").value;

            const password =
                document.getElementById("password").value;


            if (username === "customer" && password === "1234") {

                alert("Login Successfully");

                window.location.href = "index.html";

            } else {

                alert("Invalid username or password");

            }

        });

    }


    // Update cart number
    updateCartCount();


    // Load cart if cart page
    if (document.getElementById("cart-container")) {

        displayCart();

    }

});


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(name, price, image) {

    let cart =
        JSON.parse(localStorage.getItem("ziziCart")) || [];


    const existing =
        cart.find(function (product) {

            return product.name === name &&
                   product.image === image;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            image: image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "ziziCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(name + " added to cart!");

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("ziziCart")) || [];


    let count = 0;


    cart.forEach(function (product) {

        count += Number(product.quantity);

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


    const cart =
        JSON.parse(localStorage.getItem("ziziCart")) || [];


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


    // Clear container
    container.innerHTML = "";


    let total = 0;


    // ======================================
    // DISPLAY PRODUCTS
    // ======================================

    cart.forEach(function (product, index) {

        const itemTotal =
            Number(product.price) *
            Number(product.quantity);


        total += itemTotal;


        const item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="cart-details">

                <h2>${product.name}</h2>

                <p>₹${product.price}</p>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)">

                        −

                    </button>


                    <span>
                        ${product.quantity}
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


        container.appendChild(item);

    });


    // ======================================
    // TOTAL
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

    const cart =
        JSON.parse(localStorage.getItem("ziziCart")) || [];


    if (!cart[index]) {

        return;

    }


    cart[index].quantity =
        Number(cart[index].quantity) + amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "ziziCart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    const cart =
        JSON.parse(localStorage.getItem("ziziCart")) || [];


    if (!cart[index]) {

        return;

    }


    cart.splice(index, 1);


    localStorage.setItem(
        "ziziCart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    localStorage.removeItem("ziziCart");


    displayCart();

    updateCartCount();

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

    const cart =
        JSON.parse(localStorage.getItem("ziziCart")) || [];


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    // Order message
    alert("Your order is proceeded!");


    // Clear cart
    localStorage.removeItem("ziziCart");


    // Update cart count
    updateCartCount();


    // Show empty cart
    displayCart();

}