const React = require('react')
const ReactDOM = require('react-dom')

class SingleDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='single-day'>
        <div className='day'>
          The forecast for {this.props.day} is:
        </div>
        <div className='details'>
          Conditions: {this.props.dailyForecast.conditions} The high is { this.props.dailyForecast.high.fahrenheit} and the low is { this.props.dailyForecast.low.fahrenheit}
        </div>
      </div>
    )
  }
}

  module.exports = SingleDay
