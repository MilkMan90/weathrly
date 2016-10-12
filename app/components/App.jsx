const React = require('react')
const ReactDOM = require('react-dom')
const LikesCounter = require('./LikesCounter')
const SubmitButton = require('./SubmitButton')

class App extends React.Component {
  render () {
    return (
      <div>
        <LikesCounter initialCount={0}/>
        <SubmitButton text="hello"/>
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('application'))
