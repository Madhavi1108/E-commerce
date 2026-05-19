console.log("Wishlist page loaded successfully!");

// =============================
// STORAGE
// =============================

let wishlist =
    JSON.parse(
        localStorage.getItem(
            "wishlist"
        )
    ) || [];

// =============================
// ELEMENTS
// =============================

const wishlistContainer =
    document.getElementById(
        "wishlist-container"
    );

const emptyWishlist =
    document.getElementById(
        "empty-wishlist"
    );

// =============================
// RENDER WISHLIST
// =============================

function renderWishlist(){

    wishlistContainer.innerHTML = "";

    if(wishlist.length === 0){

        emptyWishlist.style.display =
            "block";

        return;

    }

    emptyWishlist.style.display =
        "none";

    wishlist.forEach((product, index) => {

        const card =
            document.createElement("div");

        card.classList.add(
            "wishlist-card"
        );

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="wishlist-content">

                <span>
                    ${product.brand || "Brand"}
                </span>

                <h4>
                    ${product.name}
                </h4>

                <p class="wishlist-price">
                    ₹${product.price}
                </p>

                <div class="wishlist-buttons">

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${index})"
                    >

                        Add To Cart

                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeWishlist(${index})"
                    >

                        Remove

                    </button>

                </div>

            </div>
        `;

        card.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "selectedProduct",
                    JSON.stringify(product)
                );

                window.location.href =
                    "product.html";

            }
        );

        wishlistContainer.appendChild(
            card
        );

    });

}

// =============================
// REMOVE WISHLIST
// =============================

function removeWishlist(index){

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    renderWishlist();

}

// =============================
// ADD TO CART
// =============================

function addToCart(index){

    let cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            )
        ) || [];

    const product =
        wishlist[index];

    const item = {

        name: product.name,

        price: `₹${product.price}`,

        img: product.image,

        qty: 1

    };

    const existing =
        cart.find(
            (p) =>
                p.name === item.name
        );

    if(existing){

        existing.qty++;

    }else{

        cart.push(item);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        "Added to cart!"
    );

}

// =============================
// INITIALIZE
// =============================

renderWishlist();