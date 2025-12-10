const inputCity=document.querySelector(".search-input")
const currentDiv=document.querySelector(".current-weather")
const hourlyHtml=document.querySelector(".hourly-weather .weather-list")
const locationBtn=document.querySelector(".location")

const API_KEY="94310c61f22d40ae80162324253005"

const weatherCodes = {
 clear: [1000],
clouds: [1003, 1006, 1009],
mist: [1030, 1135, 1147],
rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252,
1255, 1258, 1261, 1264, 1279, 1282],
thunder: [1087, 1279, 1282],
thunder_rain: [1273, 1276],
}



const displayHourly=(combined)=>{
  const currentHour=new Date().setMinutes(0,0,0)
  const next24hr=currentHour+24*60*60*1000

  const next24hrData=combined.filter(({time})=>{
    const forecastTime=new Date(time).getTime()
    return forecastTime>=currentHour && forecastTime<= next24hr
  })

hourlyHtml.innerHTML=next24hrData.map(item=>{
       const temp=Math.floor(item.temp_c)
    const time=item.time.split(" ")[1].substring(0,5)
    const weatherIcon=Object.keys(weatherCodes).find(icon=>weatherCodes[icon].includes(item.condition.code))

    return `<li class="weather-item">
                        <p class="time">${time}</p>
                         <img src="icons/${weatherIcon}.svg" class="weather-icon">
                         <p class="temprature"> ${temp}°</p>
                    </li>`
  }).join("")

  

}


const  getWeatherDetails=async (API_URL)=>{
// window.innerWidth<=768 && inputCity.blur()
    document.body.classList.remove("show-no-result")
  try{
    const response=await fetch(API_URL)
    const data=await response.json()

   

    const temp=data.current.temp_c
    const detail=data.current.condition.text
    const weatherIcon=Object.keys(weatherCodes).find(icon=>weatherCodes[icon].includes(data.current.condition.code))

    currentDiv.querySelector(".weather-icon").src=`icons/${weatherIcon}.svg`
    currentDiv.querySelector(".temprature").innerHTML=`${temp}<span>°C</span>`
    currentDiv.querySelector(".description").innerText=detail

    const combined=[...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]

    displayHourly(combined)

    inputCity.value=data.location.name;

  }catch(e){
    document.body.classList.add("show-no-result")
  }
}

const setupReq=(cityName)=>{
  const API_URL=`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`
    getWeatherDetails(API_URL)
}

inputCity.addEventListener("keyup",(e)=>{
  const cityName=inputCity.value.trim()
  if(e.key=="Enter" && cityName){
    setupReq(cityName)
  }
})


locationBtn.addEventListener("click",()=>{
  navigator.geolocation.getCurrentPosition(position=>{
    const {latitude,longitude}=position.coords
    const API_URL=`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`
    getWeatherDetails(API_URL)
  },error=>{
    alert("Location denied. Please Allow to access.")
  }
  );
})
