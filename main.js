// Afficher les données météo de la ville ou afficher un message d'erreur si la ville est introuvable

const APIKEY = "9d14fab5293af26cf8dc10b7ff26e891";

let city = "";

const weather = () => {
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

  fetch(URL).then((res) => {
    console.log(res);
    if (res.status === 200) {
      res.json().then((data) => {
        // Afficher les données météo

        let img = document.querySelector(".img");
        let actualImg = {
          soleil: "./images/soleil.png",
          soleilCouvert: "./images/soleilCouvert.png",
          nuage: "./images/nuage.png",
          orage: "./images/Orage.png",
          humidite: "./images/leau.png",
          vent: "./images/vent.png",
        };

        const sayDetails = (data) => {
          document.querySelector(".temperature").innerHTML = `${Math.floor(
            data.main.temp
          )}°C`;

          document.querySelector(".city").innerHTML = city;

          document.querySelector(
            ".details"
          ).innerHTML = `<img src="${actualImg.humidite}" alt="Humidité" /> ${data.main.humidity} % <img src="${actualImg.vent}" alt="Vent" /> ${data.wind.speed}km/h`;
        };

        // Afficher la bonne image en fonction de la météo

        switch (true) {
          case data.main.humidity < 40:
            img.innerHTML = `<img src="${actualImg.soleil}" alt="Soleil" />`;
            sayDetails(data);
            document.querySelector(".temps").innerHTML = `Dégagé`;
            break;

          case data.main.humidity >= 40 && data.main.humidity < 60:
            img.innerHTML = `<img src="${actualImg.soleilCouvert}" alt="Soleil Couvert" />`;
            sayDetails(data);
            document.querySelector(".temps").innerHTML = `Couvert`;
            break;

          case data.main.humidity >= 60 && data.main.humidity < 80:
            img.innerHTML = `<img src="${actualImg.nuage}" alt="Nuage" />`;
            sayDetails(data);
            document.querySelector(".temps").innerHTML = `Nuageux`;
            break;

          default:
            img.innerHTML = `<img src="${actualImg.orage}" alt="orage" />`;
            sayDetails(data);
            document.querySelector(".temps").innerHTML = `Orageux`;
            break;
        }
      });
      document.querySelector(".error").innerHTML = "";
    } else if (res.status === 404) {
      // Si la ville n'est pas trouvée on affiche un message d'erreur

      document.querySelector(".error").innerHTML = `Ville Introuvable`;

      // Et on efface les données météo
      document.querySelector(".img").innerHTML = "";
      document.querySelector(".temperature").innerHTML = "";
      document.querySelector(".temps").innerHTML = "";
      document.querySelector(".city").innerHTML = "";
      document.querySelector(".details").innerHTML = "";
    }
  });
};

// À chaque changement de ville, on appelle les fonction weather et getForecast

let input = document.querySelector("input");
input.addEventListener("input", (e) => {
  city = e.target.value;
  weather();
  // getForecast();
});

// Afficher le jour et la date

let date = new Date();
let dayOfWeek = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
let printDayOfWeek = dayOfWeek[date.getDay()];

document.querySelector(".jour").innerHTML = printDayOfWeek;
document.querySelector(".date").innerHTML = `${date.getUTCDate()}.${
  date.getUTCMonth() + 1
}.${date.getUTCFullYear()}`;

// Prévisions sur 16 jours

// const getForecast = () => {
//   fetch(
//     `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=16&appid=${APIKEY}`
//   ).then((res) => {
//     console.log(res);
//     // if (res.status === 200) {
//     //   res.json().then((data) => {
//     //     // Afficher les prévisions sur 16 jours

//     //     let forecast = document.querySelector(".forecast");
//     //     forecast.innerHTML = "";
//     //     for (let i = 0; i < data.list.length; i++) {
//     //       let forecastDate = new Date(data.list[i].dt * 1000);
//     //       let printForecastDate =
//     //         forecastDate.getUTCDate() +
//     //         "." +
//     //         (forecastDate.getUTCMonth() + 1) +
//     //         "." +
//     //         forecastDate.getUTCFullYear();
//     //       forecast.innerHTML += `<div class="forecast-day">
//     //       <h3>${printForecastDate}</h3>
//     //       <img src="${actualImg.soleil}" alt="Soleil" />
//     //       <p>${Math.floor(data.list[i].temp.max)}°C</p>
//     //       <p>${Math.floor(data.list[i].temp.min)}°C</p>
//     //       <p>${data.list[i].humidity}%</p>
//     //       </div>`;
//     //     }
//     //   });
//     // }
//   });
// };
