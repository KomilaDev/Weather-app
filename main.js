const container = document.getElementById("container");
const countireSearch = document.getElementById("countire-search");
const search = document.getElementById("search");
const countrieWeather = document.getElementById("countrie-weather");
const countrieName = document.getElementById("countrie-name");
const countrieNameSys = document.getElementById("countrie-name-sys");
const countrieTime = document.getElementById("countrie-time");
const weatherIcon = document.getElementById("weather-icon");
const weatherConditions = document.getElementById("weather-conditions");

function getTime() {
  let time = new Date();

  let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "August",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  let month = time.getMonth();
  let year = time.getFullYear();

  return `${date} ${months[month]}, ${year}`;
}
getTime();

let getData = async (resourse) => {
  let request = await fetch(resourse);

  if (request.status !== 200) {
    throw new Error("Ma'lumotni olishni imkoni bo'lmadi!");
  }

  let data = await request.json();

  return data;
};

countireSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.trim()) {
    let uppercase = search.value.charAt().toUpperCase();
    let slice = search.value.slice(1).toLowerCase();
    let name = uppercase + slice;
    let countrie = search.value;
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${countrie}&units=metric&appid=96b947a45d33d7dc1c49af3203966408`;
    getData(API)
      .then((data) => {
        console.log(data);
        container.style.height = "65vh";
        countrieName.innerHTML = name + ",";
        countrieNameSys.innerHTML = data.sys.country;
        data.weather.forEach((item) => {
          weatherConditions.innerHTML = item.main;
          weatherIcon.src = `http://openweathermap.org/img/wn/${item.icon}.png`;
        });
        countrieWeather.innerHTML = Math.round(data.main.temp) + "°";
        countrieTime.innerHTML = getTime();
        search.value = "";
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});
