import React, { Component } from "react";

const bank = [
  {keyCode: 27,  id: 'clear'}, {keyCode: 8,   id: 'erase'}, 
  {keyCode: 13,  id: 'equals'}, {keyCode: 109, id: 'subtract'}, 
  {keyCode: 107, id: 'add'}, {keyCode: 106, id: 'multiply'}, 
  {keyCode: 53,  id: 'mod'}, {keyCode: 111, id: 'divide'}, 
  {keyCode: 96,  id: 'zero'}, {keyCode: 97,  id: 'one'}, 
  {keyCode: 98,  id: 'two'}, {keyCode: 99,  id: 'three'}, 
  {keyCode: 100, id: 'four'}, {keyCode: 101, id: 'five'}, 
  {keyCode: 102, id: 'six'}, {keyCode: 103, id: 'seven'},
  {keyCode: 104, id: 'eight'}, {keyCode: 105, id: 'nine'},
  {keyCode: 110, id: 'decimal'},
]

class Buttons extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  
  
  handleKeyPress = e => {
    if(!isNaN(e.key) && 
       e.key !== ' ' || 
       e.key === '.') this.props.numbers(null, e.key);
    else if(/[/\-+%]/.test(e.key)) this.props.operators(null, e.key);
    else if(e.key === '*') this.props.operators(null, 'x');
    else if(e.key === 'Enter') this.props.evaluate();
    else if(e.key === 'Backspace') this.props.erase();
    else if(e.key === 'Escape') this.props.initialize();
    
    bank.map(elm => {
      if(e.keyCode === elm.keyCode) {
        const keyDown = document.getElementById(elm.id);
        keyDown.classList.add('active')
        setTimeout(() => keyDown.classList.remove('active'), 100)
      }
    })
  }
  
  
  render() {
    const {initialize, operators, numbers, evaluate, erase} = this.props;

    return (
      <div className='buttons'>
        <button id="clear"    value='clear' onClick={initialize} className="clear" >clear</button>
        <button id="erase"    value='erase' onClick={erase}  className="erase" >⇍</button>
        <button id="divide"   value='/'  onClick={operators} className="divide operator" >/</button>
        <button id="multiply" value='x'  onClick={operators} className="multiply operator" >x</button>
        <button id="add"      value='+'  onClick={operators} className="add operator" >+</button>
        <button id="subtract" value='-'  onClick={operators} className="subtract operator" >-</button>
        <button id="mod"      value='%'  onClick={operators} className="mod operator" >%</button>
        <button id="seven"    value='7'  onClick={numbers} className="seven number">7</button>
        <button id="eight"    value='8'  onClick={numbers} className="eight number">8</button>
        <button id="nine"     value='9'  onClick={numbers} className="nine number">9</button>
        <button id="four"     value='4'  onClick={numbers} className="four number">4</button>
        <button id="five"     value='5'  onClick={numbers} className="five number">5</button>
        <button id="six"      value='6'  onClick={numbers} className="six number">6</button>
        <button id="one"      value='1'  onClick={numbers} className="one number">1</button>
        <button id="two"      value='2'  onClick={numbers} className="two number">2</button>
        <button id="three"    value='3'  onClick={numbers} className="three number">3</button>
        <button id="zero"     value='0'  onClick={numbers} className="zero number">0</button>
        <button id="decimal"  value='.'  onClick={numbers} className="decimal">.</button>
        <button id="equals"   value='='  onClick={evaluate} className="equals" >=</button>
      </div>
    );
  }
}

export default Buttons;
