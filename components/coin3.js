import React, { useEffect, useState } from 'react';


class Coin3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {blue: 0, purple: 0};
  }

  render() {

    const { hasError, idyll, updateProps, ...props } = this.props;

    return (
      <div style={{width: '600px', textAlign: 'center', marginTop: '30px'}}>
      <div ref="coin" style={{background: 'purple',
                            height: '100px',
                            width: '100px',
                            margin: '20px auto',
                            borderRadius: '50%',
                            transition: 'width 100ms'}}
      >
      </div>
      <button
      onClick={() => {
        var turns = 0;
        var flipresult = Math.random()
        if (flipresult < 0.55) {
          this.setState({blue: this.state.blue + 1});
          console.log('blue');
          if (this.refs.coin.style.background === 'blue') {
            var maxturns = 5;
          }
          else {
            var maxturns = 6;
          }
        }
        else {
          this.setState({purple: this.state.purple + 1});
          console.log('purple');
          if (this.refs.coin.style.background === 'purple') {
            var maxturns = 5;
          }
          else {
            var maxturns = 6;
          }
        }
        var id = setInterval(()=>{
          if (turns === maxturns) {
            clearInterval(id);
          };
          turns+=1;
          this.refs.coin.style.width = '2px';
          setTimeout(()=> {
            if (this.refs.coin.style.background === 'blue') {
              this.refs.coin.style.background = 'purple';
            }
            else {
              this.refs.coin.style.background = 'blue';
            }
            this.refs.coin.style.width = '100px'}, 100);
        }, 200)
        }
      }
      style={{padding: '5px 15px',
              textAlign: 'center',
              width: '100px',
              fontSize: '16px',
              borderRadius: '10%'}}
      >Flip</button>
      <button
      onClick={() => {
        var b = 0;
        var p = 0;
        for (var i = 0; i < 10; i++) {
          var r = Math.random();
          if (r < 0.55) {
            b+=1;
          }
          else {
            p+=1;
          }
        }
        this.setState({blue: this.state.blue + b});
        this.setState({purple: this.state.purple + p});
        var turns = 0;
        var flipresult = Math.random()
        if (flipresult < 0.55) {
          if (this.refs.coin.style.background === 'blue') {
            var maxturns = 5;
          }
          else {
            var maxturns = 6;
          }
        }
        else {
          if (this.refs.coin.style.background === 'purple') {
            var maxturns = 5;
          }
          else {
            var maxturns = 6;
          }
        }
        var id = setInterval(()=>{
          if (turns === maxturns) {
            clearInterval(id);
          };
          turns+=1;
          this.refs.coin.style.width = '2px';
          setTimeout(()=> {
            if (this.refs.coin.style.background === 'blue') {
              this.refs.coin.style.background = 'purple';
            }
            else {
              this.refs.coin.style.background = 'blue';
            }
            this.refs.coin.style.width = '100px'}, 50);
        }, 100)
        }
      }
      style={{padding: '5px 15px',
              textAlign: 'center',
              width: '100px',
              fontSize: '16px',
              borderRadius: '10%'}}
      >Flip 10x</button>
      <div ref='counter' style={{margin: '20px auto'}}>
        purple: {this.state.purple}
        <br/>
        blue: {this.state.blue}
      </div>
      </div>
    );
  }
}

module.exports = Coin3;
