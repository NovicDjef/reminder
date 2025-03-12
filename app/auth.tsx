import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons/';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from 'expo-linear-gradient';



export default function AuthScreen() {
    const width = Dimensions.get('window');
    const [hasBiometric, setHasBiometric] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<String | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        checkBiometrics();
    }, []);
    const checkBiometrics = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            setHasBiometric(hasHardware && isEnrolled);
    }

    const authenticate = async () => {
        try {
            setIsAuthenticated(true);
            setError(null);
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            const supportedTypes = LocalAuthentication.supportedAuthenticationTypesAsync();

            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: hasHardware && hasBiometric ? 'Use face ID/ touch ID' : 'Enter your PIN access medications',
                cancelLabel: 'Cancel',
                disableDeviceFallback: false,
                fallbackLabel: 'Enter PIN',
                // fallbackAction: LocalAuthentication.FallbackAction.Allow
            });

            if (auth.success) {
                router.replace('/home');
            } else {
                setError('Authentication failed');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsAuthenticated(false);
        }
    }
  return (
    <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.container}>
        <View style={styles.content}>
            <View style={styles.iconContainer}>
            <FontAwesome name="stethoscope" size={80} color="white" />
            </View>
            <Text style={styles.title}>
                MedRemind
            </Text>
            <Text style={styles.subtitle}>
                your personal Medical reminder
            </Text>
            <View style={styles.card}>
                <Text style={styles.welcomeText}>
                    WELCOM BACK
                </Text>
                <Text style={styles.instructionText}>
                    {hasBiometric ? 'use face ID/ touch ID or PIN to access your medications' : 'enter your PIN to access your medications'}
                </Text>
                <TouchableOpacity 
                    onPress={authenticate} 
                    style={[styles.button, isAuthenticated && styles.buttonDisabled]}
                    disabled={isAuthenticated } >
                    <Ionicons style={styles.buttonIcon} name={hasBiometric ? "finger-print-outline" : "keypad-outline"} size={24} color="white" />
                    <Text style={styles.buttonText}>
                        {isAuthenticated ? 'Veryfying' : hasBiometric ? 'Authenticate' : 'enter PIN'}
                    </Text>
                </TouchableOpacity>
                    {error && <View style={styles.errorContainer}>
                    <Ionicons style={styles.errorIcon} name="alert-circle-outline" size={20} color="red" />
                    </View> && 
                        <Text style={styles.errorText}>{error}</Text>}
                    </View>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        boxShadow: 'rga(255, 255, 255, 0.5)',
        marginBottom: 10,
        textAlign: 'center',
    },
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        // width:  40,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        },
        welcomeText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: "#333",
            marginBottom: 10,
        },
        instructionText: {
            fontSize: 14,
            marginBottom: 20,
            color: "#666",
            textAlign: 'center'
        },
        button: {
            backgroundColor: "#4CAF50",
            borderRadius: 12,
            paddingVertical: 15,
            paddingHorizontal: 30,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            },
        buttonDisabled: {
            opacity: 0.7
        },
        buttonIcon: {
            marginRight: 10
        },
        buttonText: {
            color: "white",
            fontSize: 16,
            fontWeight: 600,
        },
        errorContainer: { 
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: "#ffebee",
            padding: 10,
            borderRadius: 8,
        },
        errorIcon: {
            marginRight: 5,
        },
        errorText: {
            color: '#f44336',
            marginLeft: 8,
        },
        
})