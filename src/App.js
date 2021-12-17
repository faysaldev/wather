import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css'
import Wather from './Wather';
import { useState } from 'react';

import React, { Component } from 'react'

const API_KEY = "a81b8bf385bed5ad00fa7b6c724f7fd0";

export default class App extends Component {

  constructor(){
    super();

    this.state={
      city:undefined,
      country:undefined,
      img:undefined,
      main:undefined,
      celci:undefined,
      min_tmp:undefined,
      max_tmp:undefined,
      description:"",
      error:false
    }

    this.getWether();

    this.weatherIcon={
      thunderstom: "/clouds.png",
      Dirzzle: "/cloud-computing.png",
      Rain: "/cloud (1).png",
      Snow: "/rainbow.png",
      Clerar: '/cloudy.png',
      Clouds:"/cloud.png"
    }
  }

  getwather_img(img,rangId){
    switch(true){
          case rangId >= 200 && rangId <=232 :
          this.setState({img: this.weatherIcon.thunderstom});
          break;

          case rangId >= 300 && rangId <=321 :
          this.setState({img: this.weatherIcon.Dirzzle});
          break;

          case rangId >= 500 && rangId <=551 :
          this.setState({img: this.weatherIcon.Rain});
          break;

          case rangId >= 600 && rangId <=622 :
          this.setState({img: this.weatherIcon.Snow});
          break;

          case rangId === 801:
          this.setState({img: this.weatherIcon.Clerar});
          break;

          case rangId >= 801 && rangId <=804 :
          this.setState({img: this.weatherIcon.Clouds});
          break;

          default:
            this.setState({img: this.weatherIcon.Clouds});
    }
  }

  claCelsius(tamp){
    const cell =Math.floor( tamp -273.15);
    return cell;
  }

getWether = async(city,inputCounty)=>{
  


if(city && inputCounty){
  const wather_api= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${inputCounty}&appid=${API_KEY}`);



  
  const res=await wather_api.json();
  
  console.log(res);
  
  this.setState({
    city:res.name,
    country:res.sys.country,
    celci:this.claCelsius(res.main.temp),
    min_tmp:this.claCelsius(res.main.temp_min),
    max_tmp:this.claCelsius(res.main.temp_max),
    description:res.weather[0].description,
    img:"/clouds.png"
  })

  this.getwather_img(this.weatherIcon,res.weather[0].id);


}else{

  const wather_api= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Pirojpur,Bangladesh&appid=${API_KEY}`);


    
  const res=await wather_api.json();
  
  console.log(res);
  
  this.setState({
    city:res.name,
    country:res.sys.country,
    celci:this.claCelsius(res.main.temp),
    min_tmp:this.claCelsius(res.main.temp_min),
    max_tmp:this.claCelsius(res.main.temp_max),
    description:res.weather[0].description,
    img:"/clouds.png"
  })

  this.getwather_img(this.weatherIcon,res.weather[0].id);

}

    
  
  }

  submitHandler=(e)=>{
    e.preventDefault();

    const city = e.target.elements.city.value;
    const inputCounty = e.target.elements.country.value;


    this.getWether(city,inputCounty);
  }

  render() {
    return (
      <div className="App">

      <form onSubmit={this.submitHandler}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 offset-md-2">
              <input type="text" className="form-control" placeholder="City Name" name="city" autoComplete="off" />
            </div>
            <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Country Name" name="country" autoComplete="off" />
            </div>
            <div className="col-md-3 mt-md-0 text-md-left">
            <button className="btn btn-success" type="submit">Get Weather</button>
            </div>
          </div>
        </div>
      </form>

      <Wather src={this.state.img} city={this.state.city} country={this.state.country}
      desc={this.state.description} celci={this.state.celci} min_tmp={this.state.min_tmp} max_tmp={this.state.max_tmp}/>
    </div>
    )
  }
}
