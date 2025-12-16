document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  track.innerHTML += track.innerHTML;
  track.innerHTML += track.innerHTML;
});

//Carrito
let cart = [];
let total = 0;

function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  total = parseFloat(localStorage.getItem("total")) || 0;
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    cartItemsContainer.innerHTML += `
      <div class="d-flex align-items-center justify-content-between border p-2 rounded mb-2">
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" style="width:50px; margin-right:10px;">
          <span>${item.name}</span>
        </div>
        <div class="d-flex align-items-center">
          <span class="me-2">${item.price} Bs</span>
          <button class="btn btn-sm btn-outline-danger" data-index="${index}">X</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").textContent = total;

  document.querySelectorAll("#cart-items button[data-index]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.dataset.index);
      removeItem(idx);
    });
  });
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", total);
  renderCart();
}

window.addEventListener("DOMContentLoaded", loadCart);

window.addEventListener("storage", function (event) {
  if (event.key === "cart" || event.key === "total") {
    loadCart();
  }
});

function comprar() {
  if (cart.length === 0) return;

  let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  let totalVentas = JSON.parse(localStorage.getItem("totalVentas")) || 0;

  ventas.push(...cart);
  totalVentas += total;

  localStorage.setItem("ventas", JSON.stringify(ventas));
  localStorage.setItem("totalVentas", JSON.stringify(totalVentas));

  cart = [];
  total = 0;
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));

  renderCart();

  document.getElementById("mensajeCompra").classList.remove("d-none");
}
