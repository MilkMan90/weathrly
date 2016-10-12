const React = require('react')
const ReactDOM = require('react-dom')

class UserInputField extends React.Component {
  render () {
    return (
      <input className="UserInputField" type='text' placeholder={this.props.text} onClick={this.props.handleClick}/>
    )
  }
}

module.exports = UserInputField
