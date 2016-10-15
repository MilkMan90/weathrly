const React = require('react')
const ReactDOM = require('react-dom')

const HourlyForecast = (hourlyForecast) => {

  console.log(hourlyForecast)
  let startingHour = 25 - hourlyForecast.length
  let amorpm = ' am';
  if(startingHour > 12){
    startingHour = startingHour - 12;
    amorpm = ' pm';
  }

  var hours = []
  hourlyForecast.forEach(function(hour){
    hours.push(PerHour(hour))
  });
  return(
    <div>
      {hours}
    </div>
  )
}

const PerHour = (hour) =>{
  return(
    <span className = 'each-hour'>
       {hour.FCTTIME.civil}- {hour.temp.english} --
    </span>
  )
}
module.exports = HourlyForecast
