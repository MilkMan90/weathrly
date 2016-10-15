const React = require('react')
const ReactDOM = require('react-dom')
const SingleDay = require('./SingleDay')

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
         <SingleDay day='Today' dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[0]}/>
         <SingleDay day='Tomorrow' dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[1]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[2].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[2]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[3].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[3]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[4].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[4]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[5].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[5]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[6].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[6]}/>
          </div>
    )
  }

}


module.exports = WeatherDisplay
