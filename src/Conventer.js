import React, { Component } from 'react';

class Conventer extends Component {

  state = {
    currencies: ["USD", "RUB","UZS","AUD", "EUR", "GBP", "CAD", "AMD", "AED", "AFN"],
    base: "UZS",
    amount: "",
    convertTo: "USD",
    result: "",
    date: ""
  };

  handleSelect = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      result: null,
    },
    this.calculate
    );
  };

  handleInput = (e) => {
    this.setState({
      amount: e.target.value,
      result: null
    },
    this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;

    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.fastforex.io/fetch-one?from=${this.state.base}&to=${this.state.convertTo}&api_key=36f652df87-71a0b7abe1-r0p7i6`)

      // fetch(`https://api.fastforex.io/fetch-all?api_key=36f652df87-71a0b7abe1-r0p7i6`)
      // fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const date = data.updated;
        const result = (data.result[this.state.convertTo] * amount).toFixed(5);

   
      this.setState({
        result, 
        date
      });
     });
    }
  };

  handleSwap = (e) => {
    const base = this.state.base
    const convertTo = this.state.convertTo
    e.preventDefault();
    this.setState({
      convertTo: base, 
      base: convertTo, 
      result: null
    },
    this.calculate
    )
  }

  render() {
    const  { currencies, base, amount, convertTo, result, date } = this.state

    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card card-body">
              <h5> {amount} {base} dollar to </h5>
              <h2>{result === null ? 'Calculating...' : result} {convertTo}</h2>
              <p>As of {date}</p>

              <div className="row">
                <div className="col-md-8">
                  <form className="form-inline mb-4">
                    <div className="form-group">
                      <input
                        value={amount}
                       onChange={this.handleInput}
                       type='number' 
                       className="form-control form-control-lg mx-3" />
                      <select 
                      id="selectId"
                      name="base" value={base} onChange={this.handleSelect}
                      className="form-control form-control-lg">
                          {currencies.map(currency => 
                            <option key={currency} value={currency}>
                              {currency}
                            </option>
                          )}
                    </select>
                    </div>
                  </form>

                  <form className="form-inline mb-4" method="GET">
                   <div className="form-group">
                      <input 
                      disabled={true}  
                      type='number' 
                      value={ result === null ? 'Calculating..' : result} 
                      className="form-control form-control-lg mx-3"/>  
                      <select 
                      id="selectId"
                      name="convertTo"
                      value={convertTo}
                      onChange={this.handleSelect}
                      className="form-control form-control-lg">
                         {currencies.map(currency => 
                            <option key={currency} value={currency}>
                              {currency}
                            </option>
                          )}
                      </select>
                    </div>
                  </form>
                </div>

                <div className="col-md-4 align-self-center">
                  <h1 onClick={this.handleSwap} className="swap">&#8595;&#8593;</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default Conventer;