console.log("Admin panel loaded successfully!");

// =============================
// DEMO ADMIN CHECK
// =============================

firebase.auth().onAuthStateChanged((user) => {

    if(!user){

        window.location.href = "signin.html";

    }

});

// =============================
// STORAGE
// =============================

let products =
    JSON.parse(
        localStorage.getItem(
            "adminProducts"
        )
    ) || [];

let orders =
    JSON.parse(
        localStorage.getItem(
            "orders"
        )
    ) || [];

// =============================
// ELEMENTS
// =============================

const productForm =
    document.getElementById(
        "product-form"
    );

const productTableBody =
    document.getElementById(
        "product-table-body"
    );

const ordersTableBody =
    document.getElementById(
        "orders-table-body"
    );

// =============================
// RENDER STATS
// =============================

function renderStats(){

    document.getElementById(
        "total-orders"
    ).innerText =
        orders.length;

    document.getElementById(
        "total-products"
    ).innerText =
        products.length;

    document.getElementById(
        "total-users"
    ).innerText =
        localStorage.getItem(
            "visits"
        ) || 0;

    let revenue = 0;

    orders.forEach((order) => {

        order.items.forEach((item) => {

            const price =
                parseInt(
                    item.price.replace(
                        /\D/g,
                        ""
                    )
                );

            revenue +=
                price * item.qty;

        });

    });

    document.getElementById(
        "total-revenue"
    ).innerText =
        `₹${revenue}`;

}

// =============================
// ADD PRODUCT
// =============================

productForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const product = {

            id: Date.now(),

            brand: "AnthropicBots",

            category:
                document.getElementById(
                    "product-category"
                ).value,
            
            name:
                document.getElementById(
                    "product-name"
                ).value,
            
            price:
                parseInt(
                    document.getElementById(
                        "product-price"
                    ).value
                ),
            
            description:
                document.getElementById(
                    "product-description"
                ).value,
            
            image:
                document.getElementById(
                    "product-image"
                ).value,
            
            stock:
                parseInt(
                    document.getElementById(
                        "product-stock"
                    ).value
                ),
            
            status:
                document.getElementById(
                    "product-status"
                ).value,
            
            featured:
                document.getElementById(
                    "featured-product"
                ).checked,
            
            rating: 4.5
            
        };

        products.push(product);

        localStorage.setItem(
            "adminProducts",
            JSON.stringify(products)
        );

        productForm.reset();

        renderProducts();

        renderStats();

        alert(
            "Product added successfully!"
        );

    }
);

// =============================
// RENDER PRODUCTS
// =============================

function renderProducts(){

    productTableBody.innerHTML = "";

    products.forEach((product) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${product.name}
            </td>

            <td>
                ${product.category}
            </td>

            <td>
                ₹${product.price}
            </td>

            <td>
                ${product.stock}
            </td>

            <td>

                <span class="
                    stock-badge
                    ${
                        product.status === "In Stock"
                        ? "in-stock"
                        : product.status === "Out Of Stock"
                        ? "out-stock"
                        : "hidden-stock"
                    }
                ">
                
                    ${product.status}
                
                </span>
                
            </td>
                
            <td>
                
                ${
                    product.featured
                    ? `
                        <span class="featured-badge">
                            Featured
                        </span>
                    `
                    : "—"
                }
            
            </td>
            
            <td>
            
                <div class="inventory-controls">
            
                    <button
                        class="action-btn"
                        onclick="increaseStock(${product.id})"
                    >
            
                        +
            
                    </button>
            
                    <button
                        class="action-btn delete-btn"
                        onclick="decreaseStock(${product.id})"
                    >
            
                        -
            
                    </button>
            
                </div>
            
            </td>
            
            <td>
            
                <button
                    class="action-btn edit-btn"
                    onclick="editProduct(${product.id})"
                >
            
                    Edit
            
                </button>
            
                <button
                    class="action-btn delete-btn"
                    onclick="deleteProduct(${product.id})"
                >
            
                    Delete
            
                </button>
            
            </td>
        `;

        productTableBody.appendChild(
            row
        );

    });

}

// =============================
// DELETE PRODUCT
// =============================

function deleteProduct(id){

    products =
        products.filter(
            (product) =>
                product.id !== id
        );

    localStorage.setItem(
        "adminProducts",
        JSON.stringify(products)
    );

    renderProducts();

    renderStats();

}

// =============================
// INCREASE STOCK
// =============================

function increaseStock(id){

    const product =
        products.find(
            (item) =>
                item.id === id
        );

    if(product){

        product.stock++;

    }

    localStorage.setItem(
        "adminProducts",
        JSON.stringify(products)
    );

    renderProducts();

}

// =============================
// DECREASE STOCK
// =============================

function decreaseStock(id){

    const product =
        products.find(
            (item) =>
                item.id === id
        );

    if(
        product &&
        product.stock > 0
    ){

        product.stock--;

    }

    localStorage.setItem(
        "adminProducts",
        JSON.stringify(products)
    );

    renderProducts();

}

// =============================
// RENDER ORDERS
// =============================

function renderOrders(){

    ordersTableBody.innerHTML = "";

    orders.forEach((order) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${order.id}
            </td>

            <td>
                ${order.date}
            </td>

            <td>
                ${order.items.length}
            </td>
        `;

        ordersTableBody.appendChild(
            row
        );

    });

}

// =============================
// EDIT PRODUCT
// =============================

function editProduct(id){

    const product =
        products.find(
            (item) =>
                item.id === id
        );

    if(!product) return;

    const newName =
        prompt(
            "Edit Product Name",
            product.name
        );

    const newPrice =
        prompt(
            "Edit Product Price",
            product.price
        );

    const newStock =
        prompt(
            "Edit Product Stock",
            product.stock
        );

    if(
        newName &&
        newPrice &&
        newStock
    ){

        product.name =
            newName;

        product.price =
            parseInt(newPrice);

        product.stock =
            parseInt(newStock);

        localStorage.setItem(
            "adminProducts",
            JSON.stringify(products)
        );

        renderProducts();

        renderStats();

        alert(
            "Product updated successfully!"
        );

    }

}

// =============================
// INITIALIZE
// =============================

renderProducts();

renderOrders();

renderStats();