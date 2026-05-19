console.log("Shop page loaded successfully!");

// =============================
// DEFAULT PRODUCTS
// =============================

const defaultProducts = [

    {
        id: 1,
        brand: "Adidas",
        name: "Cartoon Astronaut T-Shirts",
        category: "tshirt",
        price: 999,
        image: "../assets/images/f1.jpg"
    },

    {
        id: 2,
        brand: "Nike",
        name: "Premium Fashion Shirt",
        category: "shirt",
        price: 1299,
        image: "../assets/images/f2.jpg"
    },

    {
        id: 3,
        brand: "Puma",
        name: "Modern Casual Hoodie",
        category: "hoodie",
        price: 1499,
        image: "../assets/images/f3.jpg"
    },

    {
        id: 4,
        brand: "Levis",
        name: "Stylish Denim Jacket",
        category: "jacket",
        price: 1799,
        image: "../assets/images/f4.jpg"
    },

    {
        id: 5,
        brand: "Zara",
        name: "Casual Summer T-Shirt",
        category: "tshirt",
        price: 1199,
        image: "../assets/images/f5.jpg"
    },

    {
        id: 6,
        brand: "H&M",
        name: "Designer Hoodie",
        category: "hoodie",
        price: 1999,
        image: "../assets/images/f6.jpg"
    }

];

// =============================
// ADMIN PRODUCTS
// =============================

const adminProducts =
    JSON.parse(
        localStorage.getItem(
            "adminProducts"
        )
    ) || [];

// =============================
// COMBINED PRODUCTS
// =============================

let allProducts = [
    ...defaultProducts,
    ...adminProducts
];

// =============================
// ELEMENTS
// =============================

const searchInput =
    document.getElementById(
        "search-input"
    );

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const sortSelect =
    document.getElementById(
        "sort-select"
    );

const productContainer =
    document.getElementById(
        "product-container"
    );

// =============================
// RENDER PRODUCTS
// =============================

function renderProducts(products){

    productContainer.innerHTML = "";

    if(products.length === 0){

        productContainer.innerHTML = `
            <h3>No products found.</h3>
        `;

        return;

    }

    products.forEach((product) => {

        const productCard =
            document.createElement("div");

        productCard.classList.add(
            "pro"
        );

        productCard.dataset.category =
            product.category || "other";

        productCard.dataset.price =
            product.price;

        productCard.innerHTML = `
            <a href="product.html">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </a>

            <div class="des">

                <span>
                    ${product.brand || "Brand"}
                </span>

                <h5>
                    ${product.name}
                </h5>

                <div class="star">

                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>

                </div>

                <h4>
                    ₹${product.price}
                </h4>

                <p class="stock-info">
                    ${
                        product.stock > 0 ||
                        product.stock === undefined
                            ? `Stock: ${
                                product.stock || 20
                              }`
                            : "Out Of Stock"
                    }
                </p>

            </div>

            ${
                product.stock === 0
                ? `
                    <button class="out-stock-btn">
                        Out Of Stock
                    </button>
                `
                : `
                    <a href="#">
                        <i class="fal fa-shopping-cart cart"></i>
                    </a>
                `
            }
        `;

        // Product Redirect

        productCard.addEventListener(
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

        // Add To Cart

        const cartBtn =
            productCard.querySelector(
                ".cart"
            );

        cartBtn.addEventListener(
            "click",
            (e) => {

                e.preventDefault();

                e.stopPropagation();

                let cart =
                    JSON.parse(
                        localStorage.getItem(
                            "cart"
                        )
                    ) || [];

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
        );

        productContainer.appendChild(
            productCard
        );

    });

}

// =============================
// INITIAL RENDER
// =============================

renderProducts(allProducts);

// =============================
// SEARCH FILTER
// =============================

searchInput.addEventListener(
    "keyup",
    () => {

        const value =
            searchInput.value
            .toLowerCase();

        const filtered =
            allProducts.filter(
                (product) => {

                    return (
                        product.name
                        .toLowerCase()
                        .includes(value)
                    );

                }
            );

        renderProducts(filtered);

    }
);

// =============================
// CATEGORY FILTER
// =============================

filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach((btn) => {

                btn.classList.remove(
                    "active-filter"
                );

            });

            button.classList.add(
                "active-filter"
            );

            const category =
                button.dataset.category;

            if(category === "all"){

                renderProducts(
                    allProducts
                );

                return;

            }

            const filtered =
                allProducts.filter(
                    (product) => {

                        return (
                            product.category
                            === category
                        );

                    }
                );

            renderProducts(filtered);

        }
    );

});

// =============================
// SORT PRODUCTS
// =============================

sortSelect.addEventListener(
    "change",
    () => {

        let sortedProducts =
            [...allProducts];

        if(
            sortSelect.value
            === "low-high"
        ){

            sortedProducts.sort(
                (a, b) => {

                    return (
                        a.price - b.price
                    );

                }
            );

        }

        if(
            sortSelect.value
            === "high-low"
        ){

            sortedProducts.sort(
                (a, b) => {

                    return (
                        b.price - a.price
                    );

                }
            );

        }

        renderProducts(
            sortedProducts
        );

    }
);