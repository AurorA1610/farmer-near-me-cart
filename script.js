const allProducts = [
  {
    id: 1,
    name: "Red Rice",
    price: 180,
    quantity: 1,
    units: "Kg",
    notes: "Organic Red Rice",
  },
  {
    id: 2,
    name: "Brown Rice",
    price: 50,
    quantity: 1,
    units: "Pc",
    notes: "500gm",
  },
  {
    id: 3,
    name: "Peanut butter",
    price: 250,
    quantity: 1,
    units: "Pc",
    notes: "400gm",
  },
  {
    id: 4,
    name: "Flex seeds oil",
    price: 225,
    quantity: 1,
    units: "Pc",
    notes: "200ml",
  },
  {
    id: 5,
    name: "Home made Garlic pickle",
    price: 275,
    quantity: 1,
    units: "Pc",
    notes: "400gm",
  },
  {
    id: 6,
    name: "Kulath dal",
    price: 300,
    quantity: 1,
    units: "Kg",
    notes: "From Chamba",
  },
  {
    id: 7,
    name: "Rajmah",
    price: 150,
    quantity: 1,
    units: "Pc",
    notes: "500gm",
  },
  {
    id: 8,
    name: "Flex seeds",
    price: 150,
    quantity: 1,
    units: "Pc",
    notes: "250gm",
  },
  {
    id: 9,
    name: "Turmeric",
    price: 120,
    quantity: 1,
    units: "Pc",
    notes: "250gm",
  },
  {
    id: 10,
    name: "Rajmah",
    price: 300,
    quantity: 1,
    units: "Kg",
    notes: "",
  },
  {
    id: 11,
    name: "Cow ghee",
    price: 675,
    quantity: 1,
    units: "Pc",
    notes: "500gm",
  },
  {
    id: 12,
    name: "Urad dal",
    price: 300,
    quantity: 1,
    units: "Kg",
    notes: "From Chamba",
  },
  {
    id: 13,
    name: "Walnuts oil",
    price: 600,
    quantity: 1,
    units: "Pc",
    notes: "200ml",
  },
  {
    id: 14,
    name: "Kagzi walnuts",
    price: 750,
    quantity: 1,
    units: "kg",
    notes: "",
  },
  {
    id: 15,
    name: "Honey",
    price: 300,
    quantity: 1,
    units: "Pc",
    notes: "500gm",
  },
  {
    id: 16,
    name: "Ragi atta",
    price: 75,
    quantity: 1,
    units: "Pc",
    notes: "500gm",
  },
  {
    id: 17,
    name: "Walnut giri",
    price: 375,
    quantity: 1,
    units: "Pc",
    notes: "250gm",
  },
];

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  loadProducts(allProducts);
  var addCart = document.getElementsByClassName("add-btn");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  var removeCartIcons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartIcons.length; i++) {
    var button = removeCartIcons[i];
    button.addEventListener("click", removeCartItem);
  }
}

const loadProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <th scope="row" class="product-id d-none">${product.id}</th>
    <th scope="row" class="product-name">${product.name}</th>
    <td class="product-price">&#8377; ${product.price}</td>
    <td>${product.quantity}</td>
    <td>${product.units}</td>
    <td>${product.notes}</td>
    <td>
    <button class="btn add-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Add to cart</button>
    </td>`;
    document.getElementById("product-container").appendChild(tr);
  }
};

const addCartClicked = (event) => {
  var button = event.target;
  var shopProducts = button.parentElement.parentElement;
  var id = shopProducts.getElementsByClassName("product-id")[0].innerText;
  var name = shopProducts.getElementsByClassName("product-name")[0].innerText;
  var price = shopProducts.getElementsByClassName("product-price")[0].innerText;
  addProductToCart(id, name, price);
  updateTotal();
};

function addProductToCart(id, name, price) {
  var cartRow = document.createElement("tr");
  cartRow.classList.add("cart-row");

  var cartBody = document.getElementById("cart-body");

  var cartItemIds = cartBody.getElementsByClassName("cart-item-id");
  for (var i = 0; i < cartItemIds.length; i++) {
    if (cartItemIds[i].innerText == id) {
      return;
    }
  }

  var cartRowContent = `
    <th scope="row" class="cart-item-id d-none">${id}</th>
    <th scope="row">${name}</th>
    <td class="price">${price}</td>
    <td>
      <div>
          <i class="fa-solid fa-circle-minus text-danger decrement"></i>
          <span class="quantity">1</span>
          <i class="fa-solid fa-circle-plus text-danger increment"></i>
      </div>
    </td>
    <td class="sub-total">${price}</td>
    <td><i class="fa-solid fa-circle-xmark text-danger cart-remove"></i></td>
  `;
  cartRow.innerHTML = cartRowContent;
  cartBody.append(cartRow);
  cartRow
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("decrement")[0]
    .addEventListener("click", decrement);
  cartRow
    .getElementsByClassName("increment")[0]
    .addEventListener("click", increment);
}

const removeCartItem = (event) => {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateTotal();
};

const decrement = (event) => {
  var value = parseFloat(
    event.target.parentElement.getElementsByClassName("quantity")[0].innerText
  );
  value = value - 1;
  event.target.parentElement.getElementsByClassName("quantity")[0].innerText =
    value;
  quantityChanged(value);
};
const increment = (event) => {
  var value = parseFloat(
    event.target.parentElement.getElementsByClassName("quantity")[0].innerText
  );
  value = value + 1;
  event.target.parentElement.getElementsByClassName("quantity")[0].innerText =
    value;
  quantityChanged(value);
};

const quantityChanged = (value) => {
  if (value <= 0) {
    value = 1;
  }

  var price = parseFloat(
    document.getElementsByClassName("price")[0].innerText.replace("₹ ", "")
  );

  document.getElementsByClassName("sub-total")[0].innerText = `₹ ${
    value * price
  }`;
  updateTotal();
};

const updateTotal = () => {
  var cartContent = document.getElementById("cart-body");
  var cartRows = cartContent.getElementsByClassName("cart-row");

  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("price")[0];
    var price = parseFloat(priceElement.innerText.replace("₹ ", ""));
    var quantityElement = cartRow.getElementsByClassName("quantity")[0];
    var quantity = parseFloat(quantityElement.innerText);
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;
  console.log(total);
  document.getElementById("total-price").innerText = `₹ ${total}`;
};
