import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // const [text, setText] = useState([
  //   {
  //     source_component: '', // there is only 1 parent component
  //     operator: '',
  //     target_component: '',
  //     enable: false
  //   }
  // ])

  const [text, setText] = useState([
    {
      component_or_operator: '',
      isOperator: false,
      disabled: false
    }
  ])

  const [suggestion, setSuggestion] = useState([])

  // const handleSuggestionChange = (e) => {
  //   console.log(e.target.value)
  //   let existing_content = text
  //   const val = {
  //     name: e.target.value
  //   }
  //   existing_content.push(val)
  //   setText(existing_content)
  // }

  const handleSearchChange = (e) => {
    const val = e.target.value
    let response
    if (val == '+' || val == '-' || val == '*' || val == '/') {
      response = ['+', '-', '*', '/'].filter(item => item.includes(val))
    }
    else {
      response = search.filter(item => item.toLowerCase().includes(e.target.value))
    }
    setSuggestion(response)
    
    let arrContent = text
    console.log(parseInt(arrContent.length)-1)
    arrContent[arrContent.length-1].component_or_operator = val;
    setTimeout(()=>{
      setText(arrContent)
    },50)
    

  }
  const handleSuggestionChange = (e,item) => {
    let res = text.slice(0,text.length-1)
    const val = e.target.value
    const lastCont =  {
      component_or_operator: '',
      isOperator: false,
      disabled: false
    }
    if (val == '+' || val == '-' || val == '*' || val == '/') {
      const content = {
        component_or_operator: item,
        isOperator: true,
        disabled: false
      }
      res.push(content)
    }
    else{
      const content = {
        component_or_operator: item,
        isOperator: false,
        disabled: false
      }
      res.push(content)
    }
    res.push(lastCont)
    console.log(res)
    setText([])
    setTimeout(()=>{
      setText(res)
    },500)

  }
  const search = ['basic', 'hra', 'allowance']

  return (
    <div>
      <div className={'container'}>
        {
          text.map((item, index) => (
            <input disabled={item.disabled} value={item.component_or_operator} onChange={handleSearchChange} />
          ))
        }

        <div>{
          suggestion ?
            suggestion.map((item) => (
              <div>
                <p onClick={(e) => handleSuggestionChange(e,item)}>{item}</p>
              </div>
            ))
            : null
        }
        </div>
      </div>

    </div>
  );
}

export default App;
