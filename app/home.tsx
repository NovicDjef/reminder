import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'

export default function homeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textContaine}>home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textContaine: {
        fontSize: 24
    }
})