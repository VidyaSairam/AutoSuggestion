import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [text, setText] = useState([
    {
      component_or_operator: '',
      isOperator: false,
      disabled: false,
      color: 'black',
      isParanthesis : false,
      componentType:''
    }
  ])

  const [finalFormula, setFinalFormula] = useState([])
  const [formula_structure, setFormulaStructure] = useState([])
  const [operatorToggle, setOperatorToggle] = useState(false)
  const [numbValues, setNumbValues] = useState([])
  const [isSource, setIsSource] = useState(true);

  const [index, setIndex] = useState(0)
  const [suggestion, setSuggestion] = useState([])
  const operator = ['+', '-', '*', '/','(',')']

  //search
  const handleSearchChange = (e, index,item) => {
    const val = e.target.value
    let response
    const operatorCond = (val == '+' || val == '-' || val == '*' || val == '/' || val == '(' || val == ')') ? true : false
    const numberCond = !isNaN(val)
    
    if (operatorCond) {
      response = operator.filter(item => item.includes(val))
    }
    else if(numberCond){
      
      let num = []
      num.push(val)
      response = num.filter(item => item.includes(val))
    }
    else if(val == ''){
      response = []
    }
    else{
      response = search.filter(item => item.toLowerCase().includes(e.target.value))
    }
    setSuggestion(response)
  
    let arrContent = text
    arrContent[index].component_or_operator = val
    setTimeout(() => {
      setText(arrContent)
    }, 50)
  }



  const handleSuggestionChange = (e, item, parentIndex = null) => {
   if(item==0){
      alert('0 cannot be used')
      return
    } 
    let res = text.slice(0, text.length - 1)
    const lastCont = {
      component_or_operator: '',
      isOperator: false,
      disabled: false,
      color: 'black',
      isParanthesis : false,
      componentType:''
    }
    if (operator.includes(item)) {
      const content = {
        component_or_operator: item,
        isOperator: true,
        disabled: false,
        color: 'red',
        componentType : 'operator',
        isParanthesis : false
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
        color: 'green',
        componentType : isSource? "source" : "target",
        isParanthesis : false
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
    
    if(res[res.length-1].componentType=="target")
      res = handleWithParams(res)
    
    
    res.push(lastCont)
    setIsSource(false)
    console.log(res)
    //handle for search
    setText([])
    setSuggestion([])
    setOperatorToggle(!operatorToggle)
    setTimeout(() => {
      setText(res)
    }, 500)
    console.log(res)
  }
  const search = ['basic', 'hra', 'allowance']

  function handleWithParams(res) {
    let arg = []
    arg = res
    let params = {
      component_or_operator: '(',
      isOperator: false,
      disabled: true,
      color: 'black',
      isParanthesis : true,
      componentType:'paranthesis'
    }

    if(arg[0].componentType == "source" || arg[0].isParanthesis ){
      arg.unshift(params)
    }
    
    params = {
      component_or_operator: ')',
      isOperator: false,
      disabled: true,
      color: 'black',
      isParanthesis : true,
      componentType:'paranthesis'
    }
    arg.push(params)
    return arg
  }



  
  return (
    <div>
      <header>Proof of concept - auto suggestion</header>
      <div className={'container'}>
        {
          text.map((item, parentIndex) => (
            <input disabled={item.disabled} style={{ color: item.color }} value={item.component_or_operator} onChange={(e) => {
              setIndex(parentIndex)
              handleSearchChange(e, parentIndex,item)
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
      {/* <div>
        <input type = "submit" onClick={() => console.log(finalFormula)} />
      </div> */}
    </div>
  );
}

export default App;
