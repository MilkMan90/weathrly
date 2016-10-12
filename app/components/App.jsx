const React = require('react')
const ReactDOM = require('react-dom')
const LikesCounter = require('./LikesCounter')
const SubmitButton = require('./SubmitButton')
const UserInputField = require('./UserInputField')

class App extends React.Component {
  render () {
    return (
      <div>
        {/* <LikesCounter initialCount={0}/> */}
        <UserInputField text='this is placehold text'/>
        <SubmitButton text="Submit Location"/>
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('application'))
