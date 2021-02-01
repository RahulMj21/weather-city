const navList = document.querySelector(".nav-list");
const toggle = document.querySelector(".toggle");
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");

const searchBar = document.getElementById("search-bar");
const submit = document.getElementById("submit");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const date = document.getElementById("date");
const icon = document.getElementById("icon");

// console.log(icon.innerHTML)
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THUSDAY",
  "FRIDAY",
  "SATURDAY",
];

const newDate = new Date();
const month = newDate.getMonth();
const day = newDate.getDay();
const currentDate = newDate.getDate();


toggle.addEventListener("click", () => {
  navList.classList.toggle("active");
});

let count = 0;

setInterval(() => {
  count++;
  if (count > slide.length - 1) {
    count = 0;
  }
  slides.style.marginLeft = `-${count * 101}%`;
}, 3000);

submit.addEventListener("click", showData);

async function showData(e) {
  e.preventDefault();
  const cityName = searchBar.value;
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=5e556f4aa4675b20ac13d04112deb0d7`;

  if (cityName != "") {
    try {
      const res = await fetch(api);
      const data = await res.json();
      const arrData = [data];

      console.log(arrData[0].weather[0].main)
      
      temp.innerText = `${arrData[0].main.temp}°C`;
      city.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      date.innerText = `${currentDate} ${months[month]} ${days[day]}`;

      if (arrData[0].weather[0].main == "Clear") {
        icon.innerHTML=`<i class="fas fa-sun"></i>`;
        icon.style.color="rgb(211, 198, 24)"
      } else if (arrData[0].weather[0].main === "Haze" || "Mist") {
        icon.innerHTML=`<i class="fas fa-smog"></i>`;
        icon.style.color="#eee"
      } else if (arrData[0].weather[0].main === "Rainy") {
        icon.innerHTML = `<i class="fas fa-cloud-rain"></i>`;
        icon.style.color="#84e1f8"
      }
    } catch (error) {
      city.innerText = `enter a valid city name`;
      date.innerText = "";
      temp.innerText = "Oops..";
      icon.innerHTML = "";
    }
  } else {
    city.innerText = `Enter city name first. Then hit search`;
    date.innerText = "";
    temp.innerText = "Oops..";
    icon.innerHTML = "";
  }

  searchBar.value = "";
}
