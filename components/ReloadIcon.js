import React from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index'

export default function Refresh({ load }) {
    //get the name of the reload icon we will use.
    const reloadIconName = 'ios-refresh'
    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={reloadIconName} size={24} color={colors.PRIMARY_COLOR} />
        </View>
    )
}
const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 101,
        right: 60
    }
})
