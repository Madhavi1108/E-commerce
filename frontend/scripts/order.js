console.log("Order tracking page loaded successfully!");

// =============================
// LOAD ORDERS
// =============================

const orders =
    JSON.parse(
        localStorage.getItem(
            "orders"
        )
    ) || [];

// =============================
// GET LATEST ORDER
// =============================

const latestOrder =
    orders[orders.length - 1];

// =============================
// REDIRECT IF NO ORDER
// =============================

if(!latestOrder){

    window.location.href =
        "shop.html";

}

// =============================
// ELEMENTS
// =============================

const orderItemsContainer =
    document.getElementById(
        "order-items-container"
    );

// =============================
// RENDER ORDER INFO
// =============================

document.getElementById(
    "order-id"
).innerText =
    latestOrder.id;

document.getElementById(
    "order-date"
).innerText =
    latestOrder.date;

// =============================
// STATUS
// =============================

const status =
    latestOrder.status ||
    "Pending";

document.getElementById(
    "status-badge"
).innerText =
    status;

// =============================
// TIMELINE
// =============================

if(
    status === "Processing"
){

    document.getElementById(
        "processing-step"
    ).classList.add(
        "active-step"
    );

}

if(
    status === "Shipped"
){

    document.getElementById(
        "processing-step"
    ).classList.add(
        "active-step"
    );

    document.getElementById(
        "shipped-step"
    ).classList.add(
        "active-step"
    );

}

if(
    status === "Delivered"
){

    document.getElementById(
        "processing-step"
    ).classList.add(
        "active-step"
    );

    document.getElementById(
        "shipped-step"
    ).classList.add(
        "active-step"
    );

    document.getElementById(
        "delivered-step"
    ).classList.add(
        "active-step"
    );

}

// =============================
// RENDER ITEMS
// =============================

latestOrder.items.forEach((item) => {

    const div =
        document.createElement("div");

    div.classList.add(
        "order-item"
    );

    div.innerHTML = `
        <div class="order-item-left">

            <img
                src="${item.img}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Quantity: ${item.qty}
                </p>

            </div>

        </div>

        <h4>
            ${item.price}
        </h4>
    `;

    orderItemsContainer.appendChild(
        div
    );

});