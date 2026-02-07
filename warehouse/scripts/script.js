
/* =========================
   NAV TOGGLE
========================= */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

/* =========================
   CITY AUTOCOMPLETE
========================= */
const cities = [
  "Delhi","Manali","Dehradun","Rishikesh","Jaipur",
  "Chandigarh","Lucknow","Amritsar","Agra","Haridwar"
];

function enableAutocomplete(inputId) {
  const input = document.getElementById(inputId);

  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  input.parentNode.appendChild(wrapper);
  wrapper.appendChild(input);

  const list = document.createElement("div");
  list.style.position = "absolute";
  list.style.top = "110%";
  list.style.left = "0";
  list.style.right = "0";
  list.style.background = "#fff";
  list.style.borderRadius = "0.6rem";
  list.style.boxShadow = "0 0.5rem 1.5rem rgba(0,0,0,0.1)";
  list.style.zIndex = "10";
  list.style.display = "none";
  wrapper.appendChild(list);

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    list.innerHTML = "";

    if (!value) {
      list.style.display = "none";
      return;
    }

    cities
      .filter(city => city.toLowerCase().startsWith(value))
      .forEach(city => {
        const item = document.createElement("div");
        item.textContent = city;
        item.style.padding = "0.6rem 0.8rem";
        item.style.cursor = "pointer";

        item.onclick = () => {
          input.value = city;
          list.style.display = "none";
        };

        list.appendChild(item);
      });

    list.style.display = list.children.length ? "block" : "none";
  });

  document.addEventListener("click", e => {
    if (!wrapper.contains(e.target)) {
      list.style.display = "none";
    }
  });
}

enableAutocomplete("fromCity");
enableAutocomplete("toCity");

/* =========================
   DATE PICKER LOGIC
========================= */
const dateInput = document.getElementById("travelDate");
const todayBtn = document.getElementById("todayBtn");
const tomorrowBtn = document.getElementById("tomorrowBtn");

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function setDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  dateInput.value = formatDate(d);
}

todayBtn?.addEventListener("click", () => setDate(0));
tomorrowBtn?.addEventListener("click", () => setDate(1));

/* =========================
   PRICE ANIMATION
========================= */
function animatePrices() {
  document.querySelectorAll(".price").forEach(el => {
    let target = +el.dataset.price;
    let count = 0;

    const interval = setInterval(() => {
      count += Math.ceil(target / 25);
      if (count >= target) {
        el.innerText = "₹" + target;
        clearInterval(interval);
      } else {
        el.innerText = "₹" + count;
      }
    }, 30);
  });
}

/* =========================
   SEARCH ACTION
========================= */
function searchBuses() {
  const from = document.getElementById("fromCity").value;
  const to = document.getElementById("toCity").value;
  const date = document.getElementById("travelDate").value;

  if (!from || !to || !date) {
    alert("Please fill all fields");
    return;
  }

  window.location.href = "ticketManager/index.html";
}

/* =========================
   INIT
========================= */
window.addEventListener("load", animatePrices);

const swapBtn = document.getElementById("swapBtn");
const fromInput = document.getElementById("fromCity");
const toInput = document.getElementById("toCity");

swapBtn.addEventListener("click", () => {
  swapBtn.classList.add("rotate");

  setTimeout(() => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;

    swapBtn.classList.remove("rotate");
  }, 180);
});

function preventSameCity(changedInput) {
  const from = fromInput.value.trim().toLowerCase();
  const to = toInput.value.trim().toLowerCase();

  if (from && to && from === to) {
    alert("From and To cities cannot be the same");

    if (changedInput === "from") {
      fromInput.value = "";
    } else {
      toInput.value = "";
    }
  }
}

fromInput.addEventListener("change", () => preventSameCity("from"));
toInput.addEventListener("change", () => preventSameCity("to"));