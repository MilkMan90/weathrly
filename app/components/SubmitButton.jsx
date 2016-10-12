const React = require('react')
const ReactDOM = require('react-dom')

class SubmitButton extends React.Component {
  render() {
    return (
      <button className="SubmitButton" onClick={this.props.handleClick}>
        <span>{this.props.text}</span>
      </button>
    )
  }
}

module.exports = SubmitButton
