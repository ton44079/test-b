import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

const Card = (data) => {
  
  return (
    <div className="card">
      <img src={data.photo} alt={data.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
      </div>
    </div>
  )
}

class App extends Component {
  state = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };

  componentDidMount() {
    let match = false;
    moment.defaultFormat = "DD/MM/YYYY";
    alert("Fetch API");
    fetch('https://uinames.com/api/?ext&amount=200')
      .then(response => response.json())
      .then(data => {
        alert("Fetch Completed.");
        var thisSunday = moment().day(0);
        var month = thisSunday.month();
        var dateDay = thisSunday.date();
        console.log("Current Week :",thisSunday , month ,dateDay , thisSunday.day() );
        data.forEach((e) => {
          let eDate = moment(e.birthday.dmy, "DD/MM/YYYY").year(thisSunday.year());
          let eMonth = eDate.month();
          let eDateDate = eDate.date();
          //console.log( "Ele Date :",eDate , eMonth ,eDateDate );
          if (month === eMonth && (eDateDate >= dateDay && eDateDate < (dateDay + 7))) {
            match = true;
            switch (eDate.day()) {
              case 0: this.setState({ sun: [...this.state.sun, e] }); break;
              case 1: this.setState({ mon: [...this.state.mon, e] }); break;
              case 2: this.setState({ tue: [...this.state.tue, e] }); break;
              case 3: this.setState({ wed: [...this.state.wed, e] }); break;
              case 4: this.setState({ thu: [...this.state.thu, e] }); break;
              case 5: this.setState({ fri: [...this.state.fri, e] }); break;
              case 6: this.setState({ sat: [...this.state.sat, e] }); break;
              default:
                break;
            }
          }
        });
      }).then(()=>{
        alert("Math :"+ match);
        console.log(this.state);
      });

     
  }

  render() {
    return (
      <div className="container text-center col-sm-12">
        <table className="table table-border">
          <thead>
            <tr>
              <th width="14%">SUN</th>
              <th width="14%">MON</th>
              <th width="14%">THU</th>
              <th width="14%">WED</th>
              <th width="14%">THU</th>
              <th width="14%">FRI</th>
              <th width="14%">SAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {this.state.sun.map((el, i) => (
                  <Card {...el} key={i}></Card>
                ))}
              </td>
              <td>
                {this.state.mon.map((el, i) => (
                  <Card {...el}  key={i}></Card>
                ))}
              </td>
              <td>  {this.state.tue.map((el, i) => (
                <Card {...el}  key={i}></Card>
              ))}</td>
              <td>  {this.state.wed.map((el, i) => (
                <Card {...el} key={i}></Card>
              ))}</td>
              <td>  {this.state.thu.map((el, i) => (
                <Card {...el} key={i}></Card>
              ))}</td>
              <td>  {this.state.fri.map((el, i) => (
                <Card {...el} key={i}></Card>
              ))}</td>
              <td>
                {this.state.sat.map((el, i) => (
                  <Card {...el} key={i}></Card>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    );
  }
}

export default App;
