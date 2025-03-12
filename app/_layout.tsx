import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white',
          },
          animation: "slide_from_right",
          header: () => null,
          navigationBarHidden: true
          }} >
            <Stack.Screen name="index"
              options={{ headerShown: false }} />
            {/* <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" /> */}
      </Stack>
    </>
  )
}