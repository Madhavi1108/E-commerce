console.log("Product page loaded successfully!");

// =============================
// LOAD PRODUCT
// =============================

const product =
    JSON.parse(
        localStorage.getItem(
            "selectedProduct"
        )
    );

// =============================
// FALLBACK PRODUCT
// =============================

const fallbackProduct = {

    id: 1,

    brand: "AnthropicBots",

    name: "Modern Fashion T-Shirt",

    category: "T-Shirt",

    price: 999,

    image: "../assets/images/f1.jpg",

    description:
        "Premium quality cotton t-shirt with breathable fabric and modern fashion styling.",

    stock: 12,

    rating: 4.5

};

const currentProduct =
    product || fallbackProduct;

// =============================
// RECENTLY VIEWED PRODUCTS
// =============================

let viewedProducts =
    JSON.parse(
        localStorage.getItem(
            "recentlyViewed"
        )
    ) || [];

viewedProducts =
    viewedProducts.filter(
        (item) =>
            item.id !== currentProduct.id
    );

viewedProducts.unshift({

    id:
        currentProduct.id,

    name:
        currentProduct.name,

    brand:
        currentProduct.brand,

    price:
        currentProduct.price,

    image:
        currentProduct.image

});

viewedProducts =
    viewedProducts.slice(0, 8);

localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(viewedProducts)
);

// =============================
// ELEMENTS
// =============================

const mainImage =
    document.getElementById(
        "main-product-image"
    );

const smallImages =
    document.querySelectorAll(
        ".small-image"
    );

const qtyInput =
    document.getElementById(
        "product-qty"
    );

// =============================
// RENDER PRODUCT
// =============================

document.getElementById(
    "product-category"
).innerText =
    `Home / ${currentProduct.category}`;

document.getElementById(
    "product-name"
).innerText =
    currentProduct.name;

document.getElementById(
    "product-price"
).innerText =
    `₹${currentProduct.price}`;

document.getElementById(
    "product-brand"
).innerText =
    currentProduct.brand || "Brand";

document.getElementById(
    "product-description"
).innerText =
    currentProduct.description ||
    "Premium quality product.";

document.getElementById(
    "product-stock"
).innerText =
    currentProduct.stock > 0
        ? `${currentProduct.stock} Available`
        : "Out Of Stock";

document.getElementById(
    "product-rating-text"
).innerText =
    `(${currentProduct.rating || 4.5} Ratings)`;

// =============================
// PRODUCT VARIANTS
// =============================

const productVariants = {

    Black: {

        M: 12,

        L: 8,

        XL: 5,

        XXL: 2,

        image:
            currentProduct.image

    },

    Blue: {

        M: 9,

        L: 6,

        XL: 4,

        XXL: 1,

        image:
            "../assets/images/f2.jpg"

    },

    Red: {

        M: 7,

        L: 5,

        XL: 3,

        XXL: 1,

        image:
            "../assets/images/f3.jpg"

    },

    White: {

        M: 10,

        L: 7,

        XL: 4,

        XXL: 2,

        image:
            "../assets/images/f4.jpg"

    }

};

let selectedColor =
    "Black";

let selectedSize =
    "M";

// =============================
// ELEMENTS
// =============================

const colorButtons =
    document.querySelectorAll(
        ".color-btn"
    );

const sizeButtons =
    document.querySelectorAll(
        ".size-btn"
    );

const variantStock =
    document.getElementById(
        "variant-stock"
    );

// =============================
// UPDATE VARIANT
// =============================

function updateVariant(){

    const stock =
        productVariants[
            selectedColor
        ][selectedSize];

    variantStock.innerText =
        stock;

    mainImage.src =
        productVariants[
            selectedColor
        ].image;

}

// =============================
// COLOR EVENTS
// =============================

colorButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            colorButtons.forEach(
                (btn) => {

                    btn.classList.remove(
                        "active-color"
                    );

                }
            );

            button.classList.add(
                "active-color"
            );

            selectedColor =
                button.dataset.color;

            updateVariant();

        }
    );

});

// =============================
// SIZE EVENTS
// =============================

sizeButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            sizeButtons.forEach(
                (btn) => {

                    btn.classList.remove(
                        "active-size"
                    );

                }
            );

            button.classList.add(
                "active-size"
            );

            selectedSize =
                button.dataset.size;

            updateVariant();

        }
    );

});

// =============================
// INITIALIZE VARIANT
// =============================

updateVariant();

// =============================
// PRODUCT IMAGES
// =============================

mainImage.src =
    currentProduct.image;

smallImages.forEach((image) => {

    image.src =
        currentProduct.image;

    image.addEventListener(
        "click",
        () => {

            mainImage.src =
                image.src;

        }
    );

});

// =============================
// QUANTITY CONTROLS
// =============================

document.getElementById(
    "plus-btn"
).addEventListener(
    "click",
    () => {

        qtyInput.value =
            parseInt(qtyInput.value) + 1;

    }
);

document.getElementById(
    "minus-btn"
).addEventListener(
    "click",
    () => {

        if(
            parseInt(qtyInput.value) > 1
        ){

            qtyInput.value =
                parseInt(qtyInput.value) - 1;

        }

    }
);

// =============================
// ADD TO CART
// =============================

document.getElementById(
    "add-to-cart-btn"
).addEventListener(
    "click",
    () => {

        if(
            currentProduct.stock === 0
        ){

            alert(
                "Product is out of stock!"
            );

            return;

        }

        if(
            parseInt(qtyInput.value)
            > currentProduct.stock
        ){

            alert(
                "Selected quantity exceeds stock!"
            );

            return;

        }

        const cart =
            JSON.parse(
                localStorage.getItem(
                    "cart"
                )
            ) || [];

        const item = {

            name:
                currentProduct.name,

            price:
                `₹${currentProduct.price}`,

            img:
                mainImage.src,

            color:
                selectedColor,

            size:
                selectedSize,

            qty:
                parseInt(
                    qtyInput.value
                )
            
        };

        const existing =
            cart.find(
                (p) =>
                    p.name === item.name
            );

        if(existing){

            existing.qty += item.qty;

        }else{

            cart.push(item);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(
            "Product added to cart!"
        );

    }
);

// =============================
// BUY NOW
// =============================

document.getElementById(
    "buy-now-btn"
).addEventListener(
    "click",
    () => {

        const cart = [];

        cart.push({

            name:
                currentProduct.name,
                
            price:
                `₹${currentProduct.price}`,
                
            img:
                mainImage.src,
                
            color:
                selectedColor,
                
            size:
                selectedSize,
                
            qty:
                parseInt(
                    qtyInput.value
                )
            
        });

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        window.location.href =
            "checkout.html";

    }
);

// =============================
// WISHLIST
// =============================

document.getElementById(
    "wishlist-btn"
).addEventListener(
    "click",
    () => {

        let wishlist =
            JSON.parse(
                localStorage.getItem(
                    "wishlist"
                )
            ) || [];

        const exists =
            wishlist.find(
                (item) =>
                    item.name ===
                    currentProduct.name
            );

        if(!exists){

            wishlist.push({

                id:
                    currentProduct.id,

                name:
                    currentProduct.name,

                brand:
                    currentProduct.brand,

                price:
                    currentProduct.price,

                image:
                    currentProduct.image

            });

            localStorage.setItem(
                "wishlist",
                JSON.stringify(
                    wishlist
                )
            );

            alert(
                "Added to wishlist!"
            );

        }else{

            alert(
                "Already in wishlist!"
            );

        }

    }
);

// =============================
// RELATED PRODUCTS
// =============================

const relatedContainer =
    document.getElementById(
        "related-products-container"
    );

const adminProducts =
    JSON.parse(
        localStorage.getItem(
            "adminProducts"
        )
    ) || [];

adminProducts
.slice(0, 3)
.forEach((product) => {

    const card =
        document.createElement("div");

    card.classList.add("pro");

    card.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <div class="des">

            <span>
                ${product.brand || "Brand"}
            </span>

            <h5>
                ${product.name}
            </h5>

            <h4>
                ₹${product.price}
            </h4>

        </div>
    `;

    card.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "selectedProduct",
                JSON.stringify(product)
            );

            window.location.reload();

        }
    );

    relatedContainer.appendChild(
        card
    );

});

// =============================
// PRODUCT REVIEWS SYSTEM
// =============================

const reviewForm =
    document.getElementById(
        "review-form"
    );

const reviewContainer =
    document.getElementById(
        "review-container"
    );

// =============================
// REVIEW STORAGE KEY
// =============================

const reviewKey =
    `reviews-${currentProduct.id}`;

// =============================
// LOAD REVIEWS
// =============================

let reviews =
    JSON.parse(
        localStorage.getItem(
            reviewKey
        )
    ) || [];

// =============================
// RENDER REVIEWS
// =============================

function renderReviews(){

    reviewContainer.innerHTML = "";

    if(reviews.length === 0){

        reviewContainer.innerHTML = `
            <p>
                No reviews yet.
            </p>
        `;

        return;

    }

    reviews.forEach((review) => {

        const reviewBox =
            document.createElement("div");

        reviewBox.classList.add(
            "review-box"
        );

        let stars = "";

        for(
            let i = 0;
            i < review.rating;
            i++
        ){

            stars += `
                <i class="fas fa-star"></i>
            `;

        }

        reviewBox.innerHTML = `
            <h4>
                ${review.name}
            </h4>

            <div class="review-stars">

                ${stars}

            </div>

            <p>
                ${review.comment}
            </p>

            <div class="review-date">

                ${review.date}

            </div>
        `;

        reviewContainer.appendChild(
            reviewBox
        );

    });

}

// =============================
// SUBMIT REVIEW
// =============================

reviewForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const name =
            document.getElementById(
                "review-name"
            ).value;

        const rating =
            parseInt(
                document.getElementById(
                    "review-rating"
                ).value
            );

        const comment =
            document.getElementById(
                "review-comment"
            ).value;

        const review = {

            name,

            rating,

            comment,

            date:
                new Date()
                .toLocaleDateString()

        };

        reviews.unshift(review);

        localStorage.setItem(
            reviewKey,
            JSON.stringify(reviews)
        );

        renderReviews();

        reviewForm.reset();

        // =============================
        // UPDATE PRODUCT RATING
        // =============================

        const total =
            reviews.reduce(
                (sum, item) =>
                    sum + item.rating,
                0
            );

        const average =
            (
                total /
                reviews.length
            ).toFixed(1);

        document.getElementById(
            "product-rating-text"
        ).innerText =
            `(${average} Ratings)`;

        alert(
            "Review submitted!"
        );

    }
);

// =============================
// INITIALIZE REVIEWS
// =============================

renderReviews();

// =============================
// RECOMMENDED PRODUCTS ENGINE
// =============================

const recommendedContainer =
    document.getElementById(
        "recommended-products-container"
    );

const wishlist =
    JSON.parse(
        localStorage.getItem(
            "wishlist"
        )
    ) || [];

const recentlyViewed =
    JSON.parse(
        localStorage.getItem(
            "recentlyViewed"
        )
    ) || [];

let recommendedProducts =
    adminProducts.filter((item) => {

        // Exclude current product

        if(
            item.id ===
            currentProduct.id
        ){

            return false;

        }

        // Match category

        if(
            item.category ===
            currentProduct.category
        ){

            return true;

        }

        // Match wishlist category

        const wishlistMatch =
            wishlist.find(
                (wish) =>
                    wish.category ===
                    item.category
            );

        if(wishlistMatch){

            return true;

        }

        // Match recently viewed category

        const viewedMatch =
            recentlyViewed.find(
                (viewed) =>
                    viewed.category ===
                    item.category
            );

        if(viewedMatch){

            return true;

        }

        return false;

    });

// Limit recommendations

recommendedProducts =
    recommendedProducts.slice(0, 4);

// =============================
// RENDER RECOMMENDATIONS
// =============================

recommendedProducts.forEach((product) => {

    const card =
        document.createElement("div");

    card.classList.add("pro");

    card.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <div class="des">

            <span>
                ${product.brand || "Brand"}
            </span>

            <h5>
                ${product.name}
            </h5>

            <h4>
                ₹${product.price}
            </h4>

        </div>
    `;

    card.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "selectedProduct",
                JSON.stringify(product)
            );

            window.location.reload();

        }
    );

    recommendedContainer.appendChild(
        card
    );

});