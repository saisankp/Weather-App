import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
import {colors} from './utils/index'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
//I have included my API Key in a .env file which is not contained in this repo.
//If you wish to use this project, you are welcome to include your API key in a new .env file.
import {WEATHER_API_KEY} from 'react-native-dotenv'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  //declare constants.
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() =>{
  load()
  }, [unitsSystem])
  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      //get the user's location.
      let { status } = await Location.requestPermissionsAsync()
       
      //if the user denies their location, then show an error message!
      if(status != 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return 
      }
      
      //get the location of the user.
      const location = await Location.getCurrentPositionAsync()

      //get the user's latitude and longitude to use in a weatherURL for openweathermap.org.
      const {latitude, longitude} = location.coords

      //get a weather URL to fetch, inputting the latitude & longitude of the user, the unit system which we are going to use, and our API key.
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      //store the response in a constant.
      const response = await fetch(weatherUrl)

      //extract the JSON body content from the response.
      const result = await response.json()

      //if the response is valid, then we can set the current weather for the user. If not, send an error message.
      if(response.ok) {
        setCurrentWeather(result)
      }    else{
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  
  //Now we can focus on getting the user's time, and greeting them with a different message and icon based on their local time.
  //Javascript makes this quite easy!
  var hours = new Date().getHours()
  
  //intitialize the output text as null.
  var output = null;
  
  //We want to change the welcome message based on the user's time of day!
  if(hours <= 4){
    output = "Good Night."
  }
  else if(hours <= 11){
    output = "Good Morning."
  }
  else if(hours <= 19){
    output = "Good Evening."
  }
  else if (hours <= 23){
    output = "Good Night."
  }
  else{
    output = "Sorry, something went wrong."
  }
  
  //initialize the icon which will be displayed beside the message (with the constant "output").
  var icon = null
  
  //if it's the night, then we display the moon icon from Font Awesome.
  if(output == "Good Night."){
    icon = "moon"
  }
  //if it's the morning, then we display the sun icon from Font Awesome.
  else if(output == "Good Morning."){
    icon = "sun"
  }
  //if it's the evening, then we display a general weather icon from Font Awesome.
  else{
    icon = "cloud-sun-rain"
  }
  
  
  //if the current weather is set, then we display some stuff to the user.
  if(currentWeather){
    return (
      <View style={styles.container}>
         <StatusBar style="auto" />
        <View style={styles.main}>
          <Text style={styles.greeting}> {output}</Text>
          <FontAwesome5 style={styles.greeting} name={icon} size={25} color='#000000'/>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
          <ReloadIcon load={load}/>
        <WeatherInfo currentWeather ={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
    )} else if(errorMessage){
      return (
        <View style={styles.container}>
          <ReloadIcon load={load}/>
          <Text style={{textAlign: 'center'}}>{errorMessage}</Text>
          <StatusBar style="auto" />
        </View>
        )
    } else{
      return (
        <View style={styles.container}>
          <Text style={{textAlign: 'center', marginBottom: 50, fontSize: 20}}>Retrieving the weather at your location... </Text>
          <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
          <StatusBar style="auto" />
        </View>
      )
    }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  },
  greeting: {
    textAlign: 'center',
    top: -120,
    fontSize: 25,
    fontWeight: '500',
  }
});
