const React = require('react')
const ReactDOM = require('react-dom')
const SubmitButton = require('SubmitButton')
const UserInputField = require('UserInputField')

class LocationInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: props.initialLocation,
      city: props.initialCity,
      state: props.initialState,
      zip: props.intialZip
    };
  }

  render () {
    return (
      <div>
        <UserInputField />
        <UserInputField />
        <UserInputField />
        <SubmitButton />
        
      </div>
    )
  }
}

module.exports = LocationInput
