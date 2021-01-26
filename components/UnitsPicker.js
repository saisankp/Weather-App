import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'
import {colors} from '../utils/index'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors


export default function UnitsPicker({unitsSystem, setUnitsSystem} ) {
    return (
        <View style={styles.unitsSystem}>
            <Picker selectedValue={unitsSystem} onValueChange={(item) => setUnitsSystem(item)} mode="dropdown" itemStyle={{fontSize: 18, height: 100}}>
                <Picker.Item label="C°" value="metric"/>
                <Picker.Item label="F°" value="imperial"/>
            </Picker>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 65,
            },
            android: {
                top: 30,
            },
        }),
        
        left: 20,
        height: -50,
        width: 90
    },
    unitsSystem2: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 80,
            },
            android: {
                top: 30,
            },
        }),

        left: 20,
        height: -50,
        width: 100,
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    }
})