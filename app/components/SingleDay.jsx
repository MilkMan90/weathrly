const React = require('react')
const ReactDOM = require('react-dom')
const Hourly = require('./Hourly')

class SingleDay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHourly: false
    }
  }
  showHourly(){
  if(this.state.showHourly === false) {
    this.setState({
      showHourly: true
      }
    )
  } else {
      this.setState({
        showHourly: false
      })
    }
  }
  render() {
    let hourlyForecast
    if (this.state.showHourly === true) {
      hourlyForecast = Hourly(this.props.hourlyArray)
    } else {
      hourlyForecast =''
    }
    return (
      <div className='single-day' onClick={this.showHourly.bind(this)}>
        <div className='day'>
          {this.props.day}
        </div>
        <div className='details'>
          <img className='daily-image' src={this.props.dailyForecast.icon_url} alt={this.props.dailyForecast.icon}></img>
          <div className = 'daily-conditions'>{this.props.dailyForecast.conditions}</div>
          <p>The high is { this.props.dailyForecast.high.fahrenheit}&deg; and the low is { this.props.dailyForecast.low.fahrenheit}&deg;. There is a {this.props.dailyForecast.pop}% chance of precepitation.</p>
        </div>
        <div className = 'hourly'>
          {hourlyForecast}
        </div>
      </div>
    )
  }
}

  module.exports = SingleDay
