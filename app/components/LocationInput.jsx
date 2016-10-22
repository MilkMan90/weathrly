const React = require('react')
const ReactDOM = require('react-dom')
const classNames = require('classnames')
const UserInputField = require('./UserInputField')

class LocationInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      state: '',
      zip: '',
      apiType: 'zip'
    };
  }
  updateState(e) {
    let {placeholder, value} = e.target
    placeholder = placeholder.toLowerCase()
    value = value.toLowerCase()
    this.setState({[placeholder]: value},()=>{
      if(this.state.city !== '' || this.state.state !== ''){
        this.setState({zip:'', apiType: 'citystate'})
      } else if(this.state.zip !== ''){
        this.setState({state:'', city:'', apiType:'zip'})
      }});
  }
  submitLocation(e) {
    e.preventDefault()
    if(this.checkValidInput()){
      this.props.getLocation(this.state)
    }else{
      this.props.invalidInput()
    };
    this.setState({//clear input fields
      city: '',
      state: '',
      zip: ''
    })
  }
  checkValidInput() {
     if(this.state.zip !== ''){
       let isOnlyNumbers = new RegExp(/^\d+$/)
       if((this.state.zip.length === 5) && isOnlyNumbers.test(this.state.zip)){
          return true
        } else {
          return false
        }
     } else if(this.state.city !== '' && this.state.state !==''){
       let isOnlyChar = new RegExp(/^[A-Za-z\s]+$/)
       if(isOnlyChar.test(this.state.city) && isOnlyChar.test(this.state.state)){
         return true
       } else {
         return false
       }
     }
  }
  render() {
    var SubmitClasses = classNames({
      'button': true,
      'submit-button': true
    });
    return (
      <form id='input-fields'>
        <UserInputField inputFieldId="city" text="City" value={this.state.city}  handleChange={this.updateState.bind(this)}/>
        <UserInputField inputFieldId="state" text="State" value={this.state.state} handleChange={this.updateState.bind(this)}/>
        <span> OR </span>
        <UserInputField inputFieldId="zip" text="Zip" value={this.state.zip} handleChange={this.updateState.bind(this)}/>
        <input className={SubmitClasses} type='submit' value='Change Location' onClick={ (e) => this.submitLocation(e)} />
      </form>
    )
  }
}

module.exports = LocationInput
