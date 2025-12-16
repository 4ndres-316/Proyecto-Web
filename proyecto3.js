/*LOGIN*/
const USER = "admin";
const PASS = "1234";

function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === USER && pass === PASS) {
    localStorage.setItem("auth", "true");
    showDashboard();
  } else {
    document.getElementById("error").classList.remove("d-none");
  }
}

function logout() {
  localStorage.removeItem("auth");
  location.reload();
}

function showDashboard() {
  document.getElementById("login").classList.add("d-none");
  document.getElementById("dashboard").classList.remove("d-none");
  cargarVentas();
}

function cargarVentas() {
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  const totalVentas = JSON.parse(localStorage.getItem("totalVentas")) || 0;

  document.getElementById("cantidadProductos").textContent = ventas.length;
  document.getElementById("totalVentas").textContent = totalVentas + " Bs";
}

if (localStorage.getItem("auth") === "true") {
  showDashboard();
}
