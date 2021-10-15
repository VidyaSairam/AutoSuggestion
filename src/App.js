import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [text, setText] = useState([
    {
      component_or_operator: '',
      isOperator: false,
      disabled: false,
      color: 'black'
    }
  ])

  const [index, setIndex] = useState(0)
  const [suggestion, setSuggestion] = useState([])
  const operator = ['+', '-', '*', '/']

  const handleSearchChange = (e, index) => {
    const val = e.target.value
    let response
    if (val == '+' || val == '-' || val == '*' || val == '/') {
      response = operator.filter(item => item.includes(val))
    }
    else {
      response = search.filter(item => item.toLowerCase().includes(e.target.value))
    }
    setSuggestion(response)
    let arrContent = text
    console.log(parseInt(arrContent.length) - 1)
    arrContent[index].component_or_operator = val;
    console.log(arrContent)
    setTimeout(() => {
      setText(arrContent)
    }, 50)


  }
  const handleSuggestionChange = (e, item, parentIndex = null) => {
    let res = text.slice(0, text.length - 1)
    // const val = e.target.value
    // console.log(val)
    const lastCont = {
      component_or_operator: '',
      isOperator: false,
      disabled: false
    }
    if (operator.includes(item)) {
      const content = {
        component_or_operator: item,
        isOperator: true,
        disabled: false,
        color: 'red'
      }
      // res.push(content)
      if (parentIndex != null) {
        res[parentIndex] = content
      }
      else {
        res.push(content)
      }
    }
    else {
      const content = {
        component_or_operator: item,
        isOperator: false,
        disabled: false,
        color: 'green'
      }
      // res.push(content)
      // res[parentIndex] = content 
      if (parentIndex != null) {
        res[parentIndex] = content
      }
      else {
        res.push(content)
      }
    }
    res.push(lastCont)
    console.log(res)
    setText([])
    setSuggestion([])
    setTimeout(() => {
      setText(res)
    }, 500)

  }
  const search = ['basic', 'hra', 'allowance']

  const handleInputClick = (index) => {
    // const res = text
    // res.map((resItem, resIndex) => {
    //   if (resIndex == index) {
    //     resItem.disabled = false
    //   }
    //   else {
    //     resItem.disabled = true
    //   }
    // })
    // console.log(res)
    // setText([])
    // setTimeout(() => {
    //   setText(res)
    // }, 500)
  }

  return (
    <div>
      <header>Proof of concept - auto suggestion</header>
      <div className={'container'}>
        {
          text.map((item, parentIndex) => (
            <input disabled={item.disabled} style={{ color: item.color }} onClick={() => handleInputClick(index)} value={item.component_or_operator} onChange={(e) => {
              setIndex(parentIndex)
              handleSearchChange(e, parentIndex)
            }} />
          ))
        }
        <div>
          {
            suggestion ?
              suggestion.map((childItem) => (
                <div>
                  <p onClick={(e) => handleSuggestionChange(e, childItem, index)}>{childItem}</p>
                </div>
              ))
              : null
          }
        </div>
      </div>
      <div id={'dropdownView'}>
        <select>
          {
            search.map((childItem) => {
              return (
                <option onClick={(e) => handleSuggestionChange(e, childItem)} value={childItem}>{childItem}</option>
              )
            })

          }
        </select>

        <select>
          {
            operator.map((childItem) => {
              return (
                <option onClick={(e) => handleSuggestionChange(e, childItem)} value={childItem}>{childItem}</option>
              )
            })

          }
        </select>
      </div>
    </div>
  );
}

export default App;
