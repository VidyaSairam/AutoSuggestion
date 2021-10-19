import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [text, setText] = useState([{
    component_or_operator: '(',
    isOperator: false,
    disabled: true,
    color: 'black',
    isParanthesis: true,
    isClosingParanthesis: false,
    componentType: 'paranthesis'
  },
  {
    component_or_operator: '',
    isOperator: false,
    disabled: false,
    color: 'black',
    isParanthesis: false,
    isClosingParanthesis: false,
    componentType: ''
  },
  {
    component_or_operator: ')',
    isOperator: false,
    disabled: true,
    color: 'black',
    isParanthesis: true,
    isClosingParanthesis: true,
    componentType: 'paranthesis'
  }
  ])

  const [finalFormula, setFinalFormula] = useState([])
  const [formula_structure, setFormulaStructure] = useState([])
  const [operatorToggle, setOperatorToggle] = useState(false)
  const [numbValues, setNumbValues] = useState([])
  const [isSource, setIsSource] = useState(true);

  const [index, setIndex] = useState(0)
  const [suggestion, setSuggestion] = useState([])
  const operator = ['+', '-', '*', '/', '(']

  //search
  const handleSearchChange = (e, index, item) => {
    const val = e.target.value
    let response
    const operatorCond = (val == '+' || val == '-' || val == '*' || val == '/' || val == '(') ? true : false
    const numberCond = !isNaN(val)

    if (operatorCond) {
      response = operator.filter(item => item.includes(val))
    }
    else if (numberCond) {

      let num = []
      num.push(val)
      response = num.filter(item => item.includes(val))
    }
    else if (val == '') {
      response = []
    }
    else {
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
    if (item == 0) {
      alert('0 cannot be used')
      return
    }
    let res = (parentIndex == text.length - 2) ? text.slice(0, text.length - 1) : text
    const isParentIndex = parentIndex == res.length - 1
    const lastCont = {
      component_or_operator: '',
      isOperator: false,
      disabled: false,
      color: 'black',
      isParanthesis: false,
      isClosingParanthesis: false,
      componentType: ''
    }
    if (operator.includes(item)) {
      if (item == "(") {
        const content = {
          component_or_operator: item,
          isOperator: false,
          disabled: false,
          color: 'green',
          componentType: 'paranthesis',
          isParanthesis: true,
          isClosingParanthesis: false,
        }
        console.log("parent index ", parentIndex)
        res[parentIndex] = content
        res.splice(parentIndex + 1, 0, {
          component_or_operator: "",
          isOperator: false,
          disabled: false,
          color: 'black',
          componentType: '',
          isParanthesis: false,
          isClosingParanthesis: false
        })
        res.splice(parentIndex + 2, 0, {
          component_or_operator: ")",
          isOperator: false,
          disabled: false,
          color: 'green',
          componentType: 'paranthesis',
          isParanthesis: true,
          isClosingParanthesis: true
        })
        // if (parentIndex != null) {
        //   res[parentIndex] = content
        // }
        // else {
        //   res.push(content)
        //   res.push({
        //     component_or_operator: ")",
        //     isOperator: false,
        //     disabled: false,
        //     color: 'green',
        //     componentType: 'paranthesis',
        //     isParanthesis: true,
        //     isClosingParanthesis: true,
        //   })
        // }
      }
      else {
        const content = {
          component_or_operator: item,
          isOperator: true,
          disabled: false,
          color: 'red',
          componentType: 'operator',
          isParanthesis: false,
          isClosingParanthesis: false,
        }
        // res.push(content)
        // if (parentIndex != null) {
        //   res[parentIndex] = content
        // }
        // else {
        //   res.push(content)
        // }
        res[parentIndex] = content
      }
    }
    else {
      const content = {
        component_or_operator: item,
        isOperator: false,
        disabled: false,
        color: 'green',
        componentType: isSource ? "source" : "target",
        isParanthesis: false,
        isClosingParanthesis: false,
      }
      if (parentIndex != null) {
        res[parentIndex] = content
      }
      else {
        res.push(content)
      }
    }

    // if (res[res.length - 1].componentType == "target")
    //   res = handleWithParams(res)

    if (isParentIndex) {
      res.push(lastCont)
      res.push({
        component_or_operator: ')',
        isOperator: false,
        disabled: true,
        color: 'black',
        isParanthesis: true,
        isClosingParanthesis: true,
        componentType: 'paranthesis'
      })
    }
    setIsSource(false)


    //handle for search
    setText([])
    setSuggestion([])
    setOperatorToggle(!operatorToggle)
    setTimeout(() => {
      setText(res)
    }, 500)
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
      isParanthesis: true,
      isClosingParanthesis: false,
      componentType: 'paranthesis'
    }

    if (arg[0].componentType == "source" || arg[0].isParanthesis) {
      arg.unshift(params)
    }

    params = {
      component_or_operator: ')',
      isOperator: false,
      disabled: true,
      color: 'black',
      isParanthesis: true,
      isClosingParanthesis: true,
      componentType: 'paranthesis'
    }
    arg.push(params)
    return arg
  }


  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  }

  const handleLeftShift = (index) => {
    let res = text
    if (index == 0 || index == 1 || index == text.length - 1) {
      alert("cannot left shift starting element")
      return;
    }

    [res[index - 1], res[index]] = [res[index], res[index - 1]]
    setText([])
    setTimeout(() => {
      setText(res)
    }, 50)


  }

  const handleRightShift = (index) => {

    let res = text
    if (index == text.length - 1) {
      alert("cannot shift ending element")
      return;
    }

    [res[index], res[index + 1]] = [res[index + 1], res[index]]
    setText([])
    setTimeout(() => {
      setText(res)
    }, 50)



  }

  const handleAddParamsLeft = (index) => {
    let res = text
    if (index == 0) {
      res.unshift({
        component_or_operator: '',
        isOperator: false,
        disabled: false,
        color: 'black',
        isParanthesis: false,
        isClosingParanthesis: false,
        componentType: ''
      })
    }
    else {
      res.insert(index,
        {
          isOperator: false,
          component_or_operator: '',
          disabled: false,
          color: 'black',
          isParanthesis: false,
          isClosingParanthesis: false,
          componentType: ''
        })
    }
    setText([])
    setTimeout(() => {
      setText(res)
    }, 50)

  }

  const handleAddParamsRight = (index) => {
    let res = text
    res.insert(index + 1, {
      component_or_operator: '',
      isOperator: false,
      disabled: false,
      color: 'black',
      isParanthesis: false,
      isClosingParanthesis: false,
      componentType: ''
    })

    setText([])
    setTimeout(() => {
      setText(res)
    }, 50)
  }

  // const handleAddParams = (index) => {
  //   // console.log(index)
  //   const res = text;
  //   res.insert(index + 1, {
  //     component_or_operator: '',
  //     isOperator: false,
  //     disabled: false,
  //     color: 'black',
  //     isParanthesis: false,
  //     isClosingParanthesis: false,
  //     componentType: ''
  //   })
  //   res.insert(index + 2, {
  //     component_or_operator: '',
  //     isOperator: false,
  //     disabled: false,
  //     color: 'black',
  //     isParanthesis: false,
  //     isClosingParanthesis: false,
  //     componentType: ''
  //   })
  //   let params = {
  //     component_or_operator: ')',
  //     isOperator: false,
  //     disabled: true,
  //     color: 'black',
  //     isParanthesis: true,
  //     isClosingParanthesis: false,
  //     componentType: 'paranthesis'
  //   }
  //   res.insert(index + 3, params)
  //   params = {
  //     component_or_operator: '(',
  //     isOperator: false,
  //     disabled: true,
  //     color: 'black',
  //     isParanthesis: true,
  //     isClosingParanthesis: false,
  //     componentType: 'paranthesis'
  //   }
  //   res.unshift(params)
  //   console.log(res)
  //   setText([])
  //   setTimeout(() => {
  //     setText(res)
  //   }, 50)


  // }

  const handleDeleteParams = (index) => {
    console.log(index, text, index + 1)
    // console.log("handle delete params")
    let res = text
    const startingIndex = index
    res.splice(startingIndex, 1)
    console.log(res)
    setText([])
    setTimeout(() => {
      setText(res)
    }, 50)
  }

  return (
    <div>
      <header>Proof of concept - auto suggestion</header>
      <div className={'container'}>


        {

          text.map((item, parentIndex) => {
            {/* console.log(item, "textItem") */ }
            return (
              <div className="input_row_container">
                <div className="input_button_container">
                  <div>
                    <input className={"input_"} disabled={item.disabled} style={{ color: item.color }} value={item.component_or_operator} onChange={(e) => {
                      setIndex(parentIndex)
                      handleSearchChange(e, parentIndex, item)
                    }} />
                  </div>
                  {/* <div hidden={item.isClosingParanthesis} className={'hide'} > */}
                  <div className={'hide'}>
                    <div id="buttons_container">
                      <div id="button_container">
                        <button onClick={() => handleAddParamsLeft(parentIndex)} id="button1">{"+L"}</button>
                        <button onClick={() => handleAddParamsRight(parentIndex)} id="button1">{"+R"}</button>
                        <button onClick={() => handleDeleteParams(parentIndex)} id="button2" >{"X"}</button>
                      </div>
                      <div id="button_container">
                        <button onClick={() => handleLeftShift(parentIndex)} id="button3">{"<"}</button>
                        <button onClick={() => handleRightShift(parentIndex)} id="button3">{">"}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
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
