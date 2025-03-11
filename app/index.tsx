import { View, Text, StyleSheet, Animated} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'


export default function SplashScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current; 
  return (
    <View style={styles.container}>
        <Animated.View style={[
            styles.iconContainer,
            {
                opacity: fadeAnim,
                transform:[{scale: scaleAnim}]
            }
        ]}> 
            <Ionicons name="medical" size={100} color="white" />
            <Text>MedRemind</Text>
        </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4CAF50",
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        letterSpacing: 10
    }
})