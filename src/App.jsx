//console.log(import.meta.env.VITE_API_KEY)

import { LoadingButton } from "@mui/lab";
import { Box,Container, TextField, Typography, IconButton } from "@mui/material"
import {useState} from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./App.css"
import Clock from "./components/Clock";

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`


function App() {

  const[city, setCity]=useState("");

  const[loading, setLoading]= useState(false);

  const[condition,setCondition]=useState("");

  const[country,setCountry]=useState("");
 
  

  const[error, setError]=useState({
    error:false,
    message:""
  });

  const[weather, setWeather]= useState({
    city:"",
    country:"",
    temp:"",
    condition:"",
    icon: "",
    conditionText:""
  });
 
  const [isLoading, setIsLoading] = useState(true);

  

const handlerSubmit = async(e)=>{
  e.preventDefault();
  setLoading(true);/* cada vez que se haga una consulta se queda cargando */
  setError({
    error:false,
    message:""
  }) 
  try {
    /* trim limpia los espacios en blanco y el throw toma el error */
    if(!city.trim()) throw {message: "El campo ciudad es obligatorio"}
  const response= await fetch(`${API_WEATHER}${city}`)
  const data = await response.json();
  //si existe algun error throw lo muestra y en el catch lo setea al message del objeto error
  if(data.error) throw {message:data.error.message}
  setWeather({
    city:data.location.name,
    country:data.location.country,
    temp:data.current.temp_c,
    condition:data.current.condition.code,
    icon: data.current.condition.icon,
    conditionText:data.current.condition.text,  
  });
  setCondition(data.current.condition.text);
  setCountry(data.location.tz_id)
  } catch (error) {
    console.log(error);
    setIsLoading(false),
    setError({
      error:true,
      message:error.message,
    })
  }finally{
    setLoading(false)
    setCity("")
  }
};

 

const onClose = (name)=>{
  console.log(name)
  if(weather.city === name){
  setWeather({}); 
  }
  setCondition("")
}



  return (
    <>

      <Container
      maxWidth="xl"
      sx={{mt:2, display:"flex", flexDirection:"column", flexWrap:"wrap",justifyContent:"center", alignItems:"center"}}
      className="Container"
      data-condition={condition}
      >

     <Typography
     variant="h3"
     component="h1" /* se renderiza como un h1 */
     align="center"
     gutterBottom /* tener un espacio en la parte inferior */
     >
     Wheater App
     </Typography>

     <Box  sx={{display:"flex", flexDirection:"column", flexWrap:"wrap" }}  component="form" autoComplete="off"
     onSubmit={handlerSubmit}>

      <TextField
      className="textInput"
      sx={{background:"#f5f2f2", borderRadius:"5px"}}
      id="city"
      label="Ciudad"
      variant="outlined"
      size="small"
      required
      margin="normal"
     /*  fullWidth  */ /* cuando se usa grid se toma por defecto esta propiedad pero se puede volver a poner por si no la esta tomando */
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      error={error.error}
      helperText={error.message}
      ></TextField>
      
      <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      loadingIndicator= "Cargando..."
      >
      Buscar
      </LoadingButton>

     </Box>
     
    
     {weather.city ? (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection:"column"    
          }}
        >
        <IconButton  onClick={()=>onClose(weather.city)}>
          {condition === "Clear" || condition==="Moderate rain" ? <HighlightOffIcon sx={{color:"white"}}  /> : <HighlightOffIcon sx={{color:"black"}}  />}
        
       </IconButton>

          <Typography
            variant="h4"
            component="h2"
          >
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography
            variant="h5"
            component="h3"
          >
            {weather.temp} °C
          </Typography>
          <Typography
            variant="h6"
            component="h4"
          >
            {weather.conditionText}
          </Typography>
        
          <Clock country={country}/>
        
        </Box>
      ):
      <Typography
      textAlign="center"
      sx={{mt:2, direcction:"flex", fontSize:"10px"}}
      >
       Powered by: {""}
       <a href="https://www.weatherapi.com/" target="_blank" 
       title="Weather API"
       >WeatherAPI.com</a>
        
      </Typography>
      }


    
      </Container>
    </>
  )
}

export default App



