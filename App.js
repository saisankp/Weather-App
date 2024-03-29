import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
import { colors } from './utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { WEATHER_API_KEY } from 'react-native-dotenv'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestPermissionsAsync()
      if (status != 'granted') {
        setErrorMessage('Access to location is needed to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(weatherUrl)
      const result = await response.json()
      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  var hours = new Date().getHours()
  var output = null;
  var icon = null
  if (hours <= 11) {
    output = "Good Morning."
    icon = "sun"
  }
  else if (hours <= 19) {
    output = "Good Evening."
    icon = "cloud-sun-rain"
  }
  else{
    output = "Good Night."
    icon = "moon"
  }
  if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={styles.alignText}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } 
  else if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.main}>
          <Text style={styles.greeting}> {output}</Text>
          <FontAwesome5 style={styles.greeting} name={icon} size={25} color='#000000'/>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather}/>
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
    )
  } 
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Retrieving the weather at your location... </Text>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto"/>
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
  alignText: {
    textAlign: 'center'
  },
  loading: {
    textAlign: 'center',
    marginBottom: 50,
    fontSize: 20
  },
  greeting: {
    textAlign: 'center',
    top: -135,
    fontSize: 25,
    fontWeight: '500',
  }
});
