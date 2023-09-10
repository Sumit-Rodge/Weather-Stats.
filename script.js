const search = document.querySelector('#search') 
const searchButton = document.querySelector('.search-btn') 
const temperaturDetails = document.querySelector('.temperatur-detail') 
const cityText = document.querySelector('.city-text')
const temperaturValue = document.querySelector('.temperature-value') 
const description = document.querySelector('.description') 
const feelsLike = document.querySelector('.feels-like') 
const humidity = document.querySelector('.humidity') 
const wind = document.querySelector('.wind') 

const apiKey = '3d983913b813841ffbb1f80a2fd992fa'

let cityName='nagpur'
start('nagpur');

async function start(cityName){
   try{
    const calling = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)

    if (!calling.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await calling.json();
     
    cityText.textContent = cityName.toUpperCase()

    const temperatur = Math.round(data.list[0].main['temp'])
    temperaturValue.textContent=temperatur+'°C'

    const icon = data.list[0].weather[0]['icon'];

    temperaturDetails.querySelector('.icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" id='icon'>`;

    description.textContent=data.list[0].weather[0]['description'];
    

    feelsLike.textContent=Math.round(data.list[0].main['feels_like'])+'°C'
    humidity.textContent=Math.round(data.list[0].main['humidity'])+'%'
    wind.textContent=Math.round(data.list[0].wind['speed'])+'km/hr';
   }
    catch (error) {
    cityText.textContent=''
    temperaturValue.textContent=''
    description.textContent='An error happened, please try again later'

    feelsLike.textContent=''
    humidity.textContent=''
    wind.textContent=''
    // document.querySelector('.extra-details').innerHTML=''
}
}


function getData(event){
    event.preventDefault();
    const inputValue = search.value

    start(inputValue)
    // console.log(inputValue)
}
searchButton.addEventListener('click',getData);