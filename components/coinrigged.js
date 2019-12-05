import React, { useEffect, useState } from 'react';


class CoinRigged extends React.Component {

  constructor(props) {
    super(props);
    this.state = {black: 0, red: 0};
  }

  render() {

    const { hasError, idyll, updateProps, ...props } = this.props;

    return (
      <div style={{width: '300px', textAlign: 'center'}}>
      <div ref="coin" style={{background: 'red',
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
        if (flipresult < 0.75) {
          this.setState({black: this.state.black + 1});
          console.log('black');
          if (this.refs.coin.style.background === 'black') {
            var maxturns = 5;
          }
          else {
            var maxturns = 6;
          }
        }
        else {
          this.setState({red: this.state.red + 1});
          console.log('red');
          if (this.refs.coin.style.background === 'red') {
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
            if (this.refs.coin.style.background === 'black') {
              this.refs.coin.style.background = 'red';
            }
            else {
              this.refs.coin.style.background = 'black';
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
      <div ref='counter' style={{margin: '20px auto'}}>
        Red: {this.state.red}
        <br/>
        Black: {this.state.black}
      </div>
      </div>
    );
  }
}

module.exports = CoinRigged;
