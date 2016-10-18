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
    //calculate starting hourly index
    let currentTimeIndex = parseInt(this.props.weather.hourly_forecast[0].FCTTIME.hour)
    let hoursRemainingInDay = (24 - currentTimeIndex)
    this.sliceHourlyArray(hoursRemainingInDay);
  }
  sliceHourlyArray (hoursRemainingInDay){
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
    }

    let singleDayArray = [];

    for (var i = 0; i < 7; i++){
      var weekday = ''
      if(i === 0){
        weekday = 'Today'
      } else if(i === 1){
        weekday = 'Tomorrow'
      } else {
        weekday = this.props.weather.forecast.simpleforecast.forecastday[i].date.weekday
      }
      singleDayArray.push(
        <SingleDay day={weekday} key={i} dailyForecast={this.props.weather.forecast.simpleforecast.forecastday[i]} hourlyArray={this.state.hourlyForecastArray[i]}/>
      )
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
        {singleDayArray}
      </div>
    )
  }

}


module.exports = WeatherDisplay
