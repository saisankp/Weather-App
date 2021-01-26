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

const WEATHER_API_KEY = '00e6c4feed9f33daa09160be21affd07'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

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
      let { status } = await Location.requestPermissionsAsync()

      if(status != 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return 
      }
      const location = await Location.getCurrentPositionAsync()

      const {latitude, longitude} = location.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      if(response.ok) {
        setCurrentWeather(result)
      }    else{
        setErrorMessage(result.message)
      }

    //  alert(`Latitude : ${latitude}, Longitude: ${longitude}`)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  var hours = new Date().getHours()
  var output = null;
  switch(hours) {
    case 0:
      output = "Good Night."
      break;
    case 1:
      output = "Good Night."
      break;
    case 2:
      output = "Good Night."
      break;
    case 3:
      output = "Good Night."
      break;
    case 4:
      output = "Good Night."
      break;
    case 5:
      output = "Good Morning."
      break;
    case 6:
      output =  "Good Morning."
      break; 
    case 7:
      output =  "Good Morning."
      break; 
    case 8:
      output =  "Good Morning."
      break;
    case 9:
      output =  "Good Morning."
      break;
    case 10:
      output =  "Good Morning."
      break;
    case 11:
      output =  "Good Morning."
      break;
    case 12:
      output = "Good Evening."
      break;
    case 13:
      output = "Good Evening."
      break;
    case 14: 
      output = "Good Evening."
      break;
    case 15:
      output = "Good Evening."
      break;
    case 16:
      output = "Good Evening."
      break;
    case 17:
      output = "Good Evening."
      break;
    case 18:
      output = "Good Evening."
      break;
    case 19:
      output = "Good Evening."
      break;
    case 20:
      output = "Good Night."
      break;
    case 21:
      output = "Good Night."
      break;
    case 22:
      output = "Good Night."
      break;
    case 23:
      output = "Good Night."
      break;
    case 24:
      output = "Good Night."
      break;
    default:
      output = "Hello"
  }
  var icon = null
  if(output == "Good Night."){
    icon = "moon"
  }
  else if(output == "Good Morning."){
    icon = "sun"
  }
  else{
    icon = "cloud-sun-rain"
  }
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
          <Text style={{textAlign: 'center', marginBottom: 50, fontSize: 20}}>Retrieving the weather at your location...</Text>
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
