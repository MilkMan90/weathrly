const React = require('react')
const ReactDOM = require('react-dom')
const SingleDay = require('./SingleDay')

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourlyForecastArray: ['']
    };
  }
  componentWillMount () {
    //calculate starting hourly inde
    let date = new Date()
    let currentTimeIndex = date.getHours()
    let hoursRemainingInDay = (24 - currentTimeIndex)
    this.sliceHourlyArray(hoursRemainingInDay);
  }
  sliceHourlyArray (hoursRemainingInDay){
    console.log(this.state.dayOneStartingHourlyIndex)
    let tempForecastArray = [];
    tempForecastArray[0] = this.props.weather.hourly_forecast.slice(0, hoursRemainingInDay)
    for( var i = 1; i < 7; i++){
      let temp = this.props.weather.hourly_forecast.slice(((i-1)*24)+hoursRemainingInDay, (i*24)+hoursRemainingInDay)
      tempForecastArray.push(temp)
    }
    console.log(tempForecastArray);
  }
  render() {
    let alert;

    if(this.props.weather.alerts.length > 0){
       alert = (<div className='alerts'>{this.props.weather.alerts[0].message}</div>)
    } else {
      alert = ''
    }
    return (
      <div id='weather-box'>
        <div className='location'>
          Location: {this.props.weather.current_observation.display_location.full}
        </div>
        <div className='alerts'>
          {alert}
        </div>
        <div className='current-weather'>
          Currently, it is {this.props.weather.current_observation.weather} outside and the temperature is {this.props.weather.current_observation.temp_f} degrees.
        </div>
         <SingleDay day='Today' dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[0]} hourlyArray = {this.props.weather.hourlyForecast}/>
         <SingleDay day='Tomorrow' dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[1]} dayIndex = {1}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[2].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[2]} dayIndex = {2}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[3].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[3]} dayIndex ={3}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[4].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[4]}
          dayIndex = {4}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[5].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[5]} dayIndex = {5}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[6].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[6]} dayIndex = {6}/>
          </div>
    )
  }

}


module.exports = WeatherDisplay
