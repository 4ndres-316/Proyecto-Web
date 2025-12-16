/*Agregar carrito*/
let cart = [];
let total = 0;

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", total);
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  total = parseFloat(localStorage.getItem("total")) || 0;
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

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

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = total;

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
  saveCart();
  renderCart();
}

window.addEventListener("DOMContentLoaded", loadCart);

document.querySelectorAll(".card .btn-danger").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".card");
    const img = card.querySelector("img");
    const price = parseFloat(this.dataset.price);

    const product = { name: img.alt, image: img.src, price };
    cart.push(product);
    total += product.price;

    saveCart();
    renderCart();
  });
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

/*Sonido*/
document.querySelectorAll(".card .btn-danger").forEach((button) => {
  button.addEventListener("click", function () {
    const audioSrc = this.dataset.audio;
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.currentTime = 0;
      audio.play();
    }
  });
});
