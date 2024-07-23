import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './weather.css';
import axios from "axios";
import days from './days'
import { format } from 'date-fns';

function Weather ()
{
   
    const API_id = 'e34b4c51d8c2b7bf48d5217fe52ff79e'

    const [input,setInput] = useState('')

    const [error, setError] = useState(null)

    const [weatherData,setWeatherData] = useState([]);

    const fetchWeather = async()=>
    {
        const respo = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=e34b4c51d8c2b7bf48d5217fe52ff79e')
        setWeatherData(respo.data)
    }

    const date = new Date();
    const formatedDate = format (date, 'MMMM dd, yyyy')
    
    console.log(days[date.getDay()])

    

    useEffect(()=>{fetchWeather()},[])

    console.log(weatherData)

    const handlechange =(e)=>
    {
        setInput(e.target.value)
    }

    const handleSearch = async()=>
    {

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_id}`);
        setWeatherData(response.data);
        
          } catch (error) {
            setError('City not found. Please enter a valid city name.');
            setWeatherData(null);
            console.error('An error occurred:', error.message);
          }


       
    }

    







    return(
        <div>
            <div className="container-fluid">

            <div className="col-12  d-flex justify-content-center align-items-center vh-100 ">

           
           <article className="col-12 col-md-6  ">
           <div className="search_Field d-flex justify-content-around mx-4">
           <input type="text" value={input} onChange={handlechange} className="form-control" placeholder={input}/>
           <button onClick={handleSearch} className="btn btn-dark">Search </button>
            </div> 

            {error && <div className="alert alert-danger mt-3" role="alert"> 
                                {error} </div> }
                        
           
          
         {!error && <div> <div className=" city d-flex justify-content-center fw-bold mt-3">
                {weatherData?.name}
            </div>

            <div className=" font-italic d-flex justify-content-center mt-1  ">
            {days[date.getDay()]}, {formatedDate}
            </div>

           <div className="temp d-flex justify-content-center fw-bold">
            {weatherData.main?.temp}
           
            </div>

           <div className="d-flex justify-content-center fw-bold">
             {/* {weatherData.weather[0].description}  */}
             </div> 

             <div className="d-flex justify-content-around">
                <div className="speed ">
                    {/* {weatherData.wind.speed} */}
                   <p>Wind Speed</p> 

                </div>
                <div className="humidity ">
                    {/* {weatherData.main.humidity} */}
                   <p> Humidity</p>

                </div>
             </div>  
             </div>}

             

            


           </article>
           </div>
           </div>

        </div>
    )
}
export default Weather