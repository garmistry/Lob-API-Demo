import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

function error(string){
       Alert.error(string, {
            position: 'bottom-right',
            effect: 'slide',
            timeout: 'none'
        });
  }
function success(string){
       Alert.success(string, {
            position: 'bottom-right',
            effect: 'slide',
            timeout: 'none'
        });
  }


class App extends Component {
  
  
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      name:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      zipcode:'',
      message:''
    }
  }
  handleChange(event){
      this.setState({ [event.target.id]: event.target.value});
  }   
  submit(){
      axios({
        method:'post',
        url:'/sendletter',
        data: this.state
      })
      .then(function(response){
        if(response.data.isValue === 'true'){
          success('Message created Successfully. Check your Developer Page!'); 
        }
        else{
          error('The letter was not successfully generated. Please check your input values and try again');
        }
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container" id="mainBox">
          <div className="container" id="formBox">
            <div className="col-sm-12" id="explaination">
              <h3>Welcome to the Lob API Demonstration.</h3>
              <h4> Sagar Mistry </h4>
              <br/>The goal of this demonstration is to showcase LOB's mailing API using Google's Civic Service Search API. 
             <br/> This also was created so I could interview for a job. :).
               <br/>   <br/>
              Fill out your information below and hit submit. If you choose not to provide any information, you can hit 'Auto-send'. This will populate the fields with sample information. Then, the API will auto generate a letter and find the closest public officer via Node.js.
               <br/>   <br/>
            </div> 
            <Alert stack={{limit: 3}} />
            <div className="col-sm-12" id="formInput">
              <form onSubmit = {this.submit}>
              <div className="form-group">
                  Please Input Your Name:<br/>
                  <input type="text" className="form-contorl" id="name" value={this.state.name} onChange={this.handleChange} /> 
              </div>
              <div className="form-group">
                Please Input your address:<br/>
                <input type="text" className="form-contorl" id="address1" value={this.state.address1} onChange={this.handleChange} /><br/>
                <input type="text" className="form-contorl" id="address2" value={this.state.address2} onChange={this.handleChange} placeholder="APT #"/><br/>
              </div>
              <div className="form-group">
                Please enter your city: <br/>
                <input type="text" className="form-contorl" id="city" value={this.state.city} onChange={this.handleChange} /><br/>
              </div>
              <div className="form-group">
                Please Enter Your State Abbreviation: <h6>(Example: AL - Alabama, PA - Pennsylvania)</h6><br/>
                <input type="text" className="form-contorl" id="state" maxLength="2" value={this.state.state} onChange={this.handleChange} /><br/>
              </div>
              <div className="form-group">
                Please enter your Zip Code: <br/>
                <input type="text" className="form-contorl" id="zipcode" value={this.state.zipcode} onChange={this.handleChange} /><br/>
              </div>
              <div className="form-group">
                Please enter your message (200 Characters Max): <br/>
                <textarea type="text" className="form-contorl" id="message" value={this.state.message} onChange={this.handleChange} maxLength="200"/>
              </div>
              </form>
              <button className="btn btn-info" onClick={this.submit}>Submit</button>  
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
