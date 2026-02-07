function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}


const cities = [
  "Delhi","Manali","Dehradun","Rishikesh","Jaipur",
  "Chandigarh","Lucknow","Amritsar","Agra","Haridwar"
];

function enableAutocomplete(id) {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
        const list = cities.filter(c =>
            c.toLowerCase().startsWith(input.value.toLowerCase())
        );
        input.setAttribute("list", id + "list");

        let datalist = document.getElementById(id + "list");
        if (!datalist) {
            datalist = document.createElement("datalist");
            datalist.id = id + "list";
            document.body.appendChild(datalist);
        }
        datalist.innerHTML = list.map(c => `<option value="${c}">`).join("");
    });
}

enableAutocomplete("fromCity");
enableAutocomplete("toCity");

function animatePrices() {
    document.querySelectorAll(".price").forEach(el => {
        let target = +el.dataset.price;
        let count = 0;
        let interval = setInterval(() => {
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

window.onload = animatePrices;

function searchBuses() {
    if (!fromCity.value || !toCity.value || !travelDate.value) {
        alert("Please fill all fields");
        return;
    }
    window.location.href = "ticketManager/index.html";
}

window.onload = animatePrices;


