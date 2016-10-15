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
    <div className='all-hours'>
      {hours}
    </div>
  )
}

const PerHour = (hour) =>{
  return(
    <span key={hour.FCTTIME.hour} className = 'each-hour'>
       <div className= "hour-label">{hour.FCTTIME.civil}</div>
       <div className= "hourly-temp">{hour.temp.english}&deg;</div>
       <div className= "hourly-pop">{hour.pop}% precip</div>
    </span>
  )
}
module.exports = HourlyForecast
