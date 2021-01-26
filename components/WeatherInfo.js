import React from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import {colors} from '../utils/index'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({currentWeather}) {
    const {
        main: {temp},
        weather: [details],
        name,
    } = currentWeather
    const { icon, main, description } = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.WeatherInfo}>
            <Text style={styles.textTop}>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconUrl}} />
            <Text style={styles.textPrimary}> {temp}°</Text>
            <Text style={styles.weatherDescription}>{description}.</Text>
            {/*<Text style={styles.textSecondary}>{main}</Text>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    WeatherInfo: {
        alignItems: 'center',
        marginBottom: -90
    },
    weatherDescription: {
       textTransform: 'capitalize',
       fontSize: 20,
    },
    weatherIcon: {
        width: 100,
        height: 100
    },
    textPrimary: {
        marginTop: -20,
        fontSize: 40,
        color: PRIMARY_COLOR,
        marginBottom: 10
    },
    textSecondary : {
        textAlign: 'center',
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },
    textTop : {
        textAlign: 'center',
        fontSize: 40,
        color: PRIMARY_COLOR,
        marginBottom: -15,
    }
})
