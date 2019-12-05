const React = require('react');

class Guess1 extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div style={{width: '600px', textAlign: 'center'}}>
      <button style={{backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '15px 15px',
                      margin: '0px 75px',
                      textAlign: 'center',
                      width: '150px',
                      fontSize: '20px',
                      display: 'inline-block'}}
      onClick={()=>{this.refs.no.style.display='block';
                    this.refs.yes.style.display='none';
                    this.refs.spacer.style.display='none'}}>Left Coin</button>
        <button style={{backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '15px 15px',
                        margin: '0px 75px',
                        textAlign: 'center',
                        width: '150px',
                        fontSize: '20px',
                        display: 'inline-block'}}
      onClick={()=>{this.refs.yes.style.display='block';
                    this.refs.no.style.display='none';
                    this.refs.spacer.style.display='none'}}>Right Coin</button>
      <div style={{margin: '50px 0px',
                  display: 'none',
                  fontSize: '45px',
                  color: 'green',
                  fontWeight: 'bold'
      }}
      ref='yes'>Yup you got it!</div>
      <div style={{margin: '50px 0px',
                  display: 'none',
                  fontSize: '45px',
                  color: 'maroon',
                  fontWeight: 'bold'
      }}
      ref='no'>Nah it was the other one</div>
      <div ref = 'spacer' style = {{height: '500px'}}></div>
      </div>
    );
  }
}

module.exports = Guess1;
