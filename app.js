const form = document.querySelector("form");
const theCity=document.querySelector("#theCity")

//!Using fetch() method- fetch() metodu ile verilere ulaşma

// fetch(URL)
// .then((res)=>{
//     if(!res.ok){
//         throw new Error("Data did not load")
//     }else{
//        return res.json();
//     }
// })
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>{
//     console.log(err)
// })

//!Using aysnc-await method- aysnc-await metodu ile verilere ulaşma

const getData = async () => {
  const input = document.querySelector("input");
  const API_KEY = "28ec386abbdaaa4edccdf4af4e6f21f4";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric&lang=tr`;

  const response = await fetch(URL);
  const data = await response.json();
  setDomCityWheather(data);
};

//!Event-Listener

form.addEventListener("submit", (e) => {
  getData();

  form.reset();
  e.preventDefault();
});

//!Functions

const setDomCityWheather = (data) => {

    const{main:{temp,feels_like,humidity},sys:{country},name}=data;

    const createdDiv = document.createElement("div");
    createdDiv.className = "card";
    createdDiv.style.width = "18rem";
    createdDiv.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-top img-thumbnail" alt="icon">
            <div class="card-body d-flex flex-column align-items-center">
                  <p  class="card-title h3"><span id="city">${name}</span><span id="country"> (${country})</span></p>
                  
                  <p id="weatherEvent" class="h4 mb-4">${data.weather[0].description}</p>
                  <p class="h4">Sıcaklık :<span id="temp">${temp}°C</span></p>
                  <p class="h6">Hissedilen Sıcaklık <span id="feels_like">${feels_like}°C</span></p>
                  <p class="h6">Nem : <span id="humidity">${humidity}%</span></p>
            </div>
        `;
    theCity.append(createdDiv);
};
