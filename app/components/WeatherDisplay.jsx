const React = require('react')
const ReactDOM = require('react-dom')
const SingleDay = require('./SingleDay')

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourlyForecastArray: [''],
      showAlert: false
    };
  }
  componentWillMount () {
    //calculate starting hourly inde
    let currentTimeIndex = parseInt(this.props.weather.hourly_forecast[0].FCTTIME.hour)
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
    this.setState({
      hourlyForecastArray: tempForecastArray
    })
  }
  showAlert(){
    if(this.state.showAlert === false){
      this.setState({
        showAlert: true
      })
    } else {
      this.setState({
        showAlert: false
      })
    }
  }
  render() {
    let alert;

    if(this.props.weather.alerts.length > 0){
      if(this.state.showAlert === true){
        alert = (<div className='alerts'>{this.props.weather.alerts[0].message}</div>)
      } else {
        alert = (<div className='show-alert'>Click to Show Alert</div>)
      }
    } else {
      alert = ''
    }

    return (
      <div id='weather-box'>
        <div className='location'>
          <strong>Location:</strong> {this.props.weather.current_observation.display_location.full}
        </div>
        <div className='alerts' onClick={this.showAlert.bind(this)}>
          {alert}
        </div>
        <div className='current-weather'>
          <div className = 'current-weather-header'>Now</div>
            <img className='daily-image' src={this.props.weather.current_observation.icon_url} alt={this.props.weather.current_observation.icon}></img>
          <p className = 'cur-weather'>
          {this.props.weather.current_observation.weather}</p>
          <p className = 'cur-temp'>{this.props.weather.current_observation.temp_f}&deg; </p>
        </div>
        <p className='location'>Click on any day for hourly temps</p>
         <SingleDay day='Today' dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[0]} hourlyArray = {this.state.hourlyForecastArray[0]}/>
         <SingleDay day='Tomorrow' dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[1]} hourlyArray = {this.state.hourlyForecastArray[1]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[2].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[2]} hourlyArray = {this.state.hourlyForecastArray[2]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[3].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[3]} hourlyArray = {this.state.hourlyForecastArray[3]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[4].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[4]}
          hourlyArray = {this.state.hourlyForecastArray[4]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[5].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[5]} hourlyArray = {this.state.hourlyForecastArray[5]}/>
         <SingleDay day={this.props.weather.forecast.simpleforecast.forecastday[6].date.weekday} dailyForecast = {this.props.weather.forecast.simpleforecast.forecastday[6]} hourlyArray = {this.state.hourlyForecastArray[6]}/>
          </div>
    )
  }

}


module.exports = WeatherDisplay
