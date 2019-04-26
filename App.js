import React, { Component } from "react";
import Buttons from "./buttons";

import './app.scss';

class App extends Component {
  state = {
    formulaScreen: '',
    outputScreen: '0',
    evaluate: false
  }


  handleEvaluate = () => {
    let {outputScreen, formulaScreen} = this.state;
    let str, err;
    console.log('before outputScreen ', outputScreen)
    outputScreen = numeral(outputScreen).value();
    console.log('after outputScreen ', outputScreen)
    if(isNaN(parseFloat(outputScreen))) str = formulaScreen.slice(0,-1).replace(/x/g, '*');
    else str = (formulaScreen+outputScreen).replace(/x/g, '*')
    console.log(str)
    try {
      outputScreen = Math.round(1000000000000 * eval(str)) / 1000000000000;
    } catch(error){
      outputScreen = ''
      err = error.toString()
    }
    console.log('before', outputScreen)
    outputScreen = numeral(outputScreen).format('0,0.[0000]');
    console.log('after', outputScreen)
    this.setState({
      outputScreen,
      formulaScreen: err || '',
      evaluate: true
    })
  }
  
  
  handleOperators = (e, key) => {
    let {outputScreen, formulaScreen, evaluate} = this.state;
    const operator = key || e.target.value;
    if(evaluate === true) formulaScreen = outputScreen
    else {
      if(formulaScreen === '0' || 
         !/^[/x\-+%\d.]+$/.test(outputScreen)) formulaScreen = ''
      if(!isNaN(parseFloat(outputScreen))) formulaScreen += parseFloat(outputScreen)
      else formulaScreen = formulaScreen.slice(0,-1)
    }
    this.setState({
      outputScreen: operator, 
      formulaScreen: formulaScreen + operator,
      evaluate: false
    })
  }
  
  
  handleNumbers = (e, key) => {
    let {outputScreen, evaluate} = this.state;
    const number = key || e.target.value;
    if(evaluate === true) outputScreen = '0'
    if(outputScreen.length > 19) return
    if(number === '.' && `${outputScreen}`.includes('.')) return
    if(/[/x\-+%]/.test(outputScreen) || outputScreen === '0') outputScreen = ''
    outputScreen = outputScreen + number
    this.setState({outputScreen, evaluate: false})
  }
  
  initialize = () => {
    this.setState({outputScreen: '0', formulaScreen: '', evaluate: false})
  }
  
  
  erase = () => {
    let {outputScreen, evaluate} = this.state;
    if(evaluate === true) return
    if(outputScreen.length <= 1) return this.setState({outputScreen: '0'})
    outputScreen = `${outputScreen}`.slice(0,-1);
    this.setState({outputScreen})
  }
  
  
  render() {
    const {outputScreen, formulaScreen} = this.state
    return (
      <div className="calculator">
        <div className='shadow'>
          <div className="formula-screen">{formulaScreen} </div>
          <div id="display" className="output-screen">{outputScreen}</div>
          <Buttons 
            evaluate={this.handleEvaluate}
            operators={this.handleOperators}
            initialize={this.initialize} 
            numbers={this.handleNumbers}
            erase={this.erase}
          />
        </div>
      </div>
    )
  }
}

export default App;
