const React = require('react')
const ReactDOM = require('react-dom')

const UserInputField = ({inputFieldId, text, value, handleChange}) => {
    return (
      <input className="UserInputField" id={inputFieldId} value={value} type="text" placeholder={text} onChange={handleChange}/>
    )
}

module.exports = UserInputField
