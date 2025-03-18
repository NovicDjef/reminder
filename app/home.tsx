import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions, Modal } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Svg, { Circle } from "react-native-svg"
import { Link, useRouter } from 'expo-router'

const {width} = Dimensions.get("window")

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS =[
    {
        icon: "add-circle-outline" as const,
        label: "Add\nMedication", 
        route: "/medications/add" as const,
        color: "#2E7D32",
        gradient: ["#4CAF50", "#2E7D32"] as [string, string],
    },
    {
        icon: "calendar-outline" as const,
        label: "calendar\nView",
        route: "/calendar/add" as const,
        color: "#1976d2",
        gradient: ["#2196f3", "#1976d2"] as [string, string],
    },
    {
        icon: "time-outline" as const,
        label: "History\nLog",
        route: "/history" as const,
        color: "#C2185B",
        gradient: ["#E91E63", "#C2185B"] as [string, string],
    },
    {
        icon: "add-circle-outline" as const,
        label: "Add\nMedication",
        route: "/medications/add" as const,
        color: "#E64A19",
        gradient: ["#FF5722", "#E64A19"] as [string, string],
    },
];

interface CicularProgressProps{
    progress: number;
    totalDoses: number;
    completedDoses: number;
}

function CircularProgress({
    progress,
    totalDoses,
    completedDoses,
}: CicularProgressProps){
    const animationValue = useRef(new Animated.Value(0)).current;
    const size = width * 0.55;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() =>{
        Animated.timing(animationValue, {
            toValue: progress, 
            duration: 1000,
            useNativeDriver: true,
        }).start();
    },[progress]);

    const strokeDashoffset = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0]
    }) 
    return(
        <View style={styles.progressContainer}>
            <View style={styles.progressTextContainer}>
                <Text style={styles.progressPourcentage}>{Math.round(progress)}%</Text>
                <Text style={styles.progressLabel}>{completedDoses} of {totalDoses} doeses</Text>
            </View>
             <Svg width={size} height={size} style={styles.progressRange}>
                <Circle 
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}  
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <AnimatedCircle 
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}  
                    stroke="white"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                
                />
             </Svg>
        </View>
    )
}



export default function HomeScreen() {

    const route = useRouter()
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#1a8E2D", "#146922"]} style={styles.header}>
            <View style={styles.headerContent}>
                <View style={styles.headerTitle}>
                    <View style={{flex: 1}}>
                    <Text style={styles.greeting}>Daily Progress</Text>
                    </View>
                    <TouchableOpacity style={styles.notificatioButon}>
                        <Ionicons style={{}} name="notifications-outline" size={24} color="white" />
                        {   <View style={styles.notificationBadge} >
                               <Text style={styles.notificationCount}>1</Text> 
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                <CircularProgress 
                    progress={50}
                    totalDoses={10}
                    completedDoses={5}
                />
            </View>
        </LinearGradient>
        <View style={styles.content}>
            <View style={styles.quickActionsContainer}>
                <Text style={styles.aectionTitle}>Quick Actions</Text>
            </View>
            <View style={styles.quickActionsGrid}>  
                {QUICK_ACTIONS.map((action) => (
                    <Link href={action.route} key={action.label} asChild>
                        <TouchableOpacity style={styles.actionButton}>
                            <LinearGradient colors={action.gradient} style={styles.actionGradient}>
                                <View style={styles.actionContent}>
                                    <View style={styles.actionIcon}>
                                        <Ionicons name={action.icon} size={24} color="white" />
                                    </View>
                                    <View>
                                        <Text style={styles.actionsLabel}>{action.label}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </View>

        <View style={{ padding: 20 }}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Today's Schedule</Text>
                <Link href="/calender" asChild>
                    <TouchableOpacity>
                        <Text style={styles.seeAllButton}>See All</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            {true ? (
                <View style={styles.emtyState}>
                    <FontAwesome name="stethoscope" size={48} color="#ccc" />
                    <Text style={styles.emptyStateText}>No Medications Scheduled</Text>
                    <Link href="medications/add">
                        <TouchableOpacity style={styles.addMedicationButton}>
                            <Text style={styles.addMedicationButtonText}>Add Medication</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            ) : (
                [].map((medications) => {
                    return(
                        <View style={styles.doseCard}>
                            <View style={styles.doseBadge}>
                                <FontAwesome name='stethoscope' size={24} />
                            </View>
                            <View style={styles.doseInfo}> 
                                <View>
                                    <Text>Name</Text>
                                    <Text>Dosage</Text>
                                </View>
                                <View style={styles.doseTime}>
                                    <Ionicons name="time-outline" size={16} color="#ccc" />
                                    <Text style={styles.timeText}>Time</Text>
                                </View>
                            </View>
                            {true ? (
                                <View style={styles.takeDoseButton}>
                                    <Ionicons name="checkmark-circle-outline" size={24} />
                                    <Text style={styles.takeDoseText}>Taken</Text>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.takeDoseButton}>
                                    <Text style={styles.takeDoseText}>Take</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )
                })
            )}
        </View>
        <Modal visible={false} transparent={true} animationType='slide'>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        Notification
                    </Text>
                    <TouchableOpacity style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                {[].map((medication) => 
                <View style={styles.notificationItem}>
                    <View style={styles.notifcationIcon}> 
                        <FontAwesome name='stethoscope' size={24} />
                    </View>
                    <View style={styles.notificationContent}>
                        <Text style={styles.notificationTitle}> Medication name</Text>
                        <Text style={styles.notificationMessage}> Medication dosage</Text>
                        <Text style={styles.notificationTime}> Medication time</Text>
                    </View>
                </View>
            )}
            </View>
        </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    header: {
        paddingTop: 50,
        paddingBottom: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    headerContent: {
        alignItems: "center",
        paddingHorizontal: 20,
    },
    headerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 20
    },
    greeting: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        opacity: 0.9
    },
    content: {
        flex: 1,
         paddingTop: 20
    },
    card: {
        paddingTop: 20
    },
    notificatioButon: {
        position: "relative",
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 12
        
    },
    notificationBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#ff5252",
        borderRadius: 100,
        padding: 2,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
        borderWidth: 2,
        minWidth: 20,
        borderColor: "#146922"
    },
    notificationCount:{
        fontSize: 14,
        color: "white",
        top: -2
    },
    notificationText: {
        fontSize: 11,
        fontWeight: 600,
        color: " white"
    },
   
    progressContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    },
    progressTextContainer: {
        position: "absolute",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    progressPourcentage: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold"
    },
    progressLabel: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.9)",
        fontWeight: "bold"
    },

    progressDetails: {
        fontSize: 11,
        color: "white",
        fontWeight: "bold"        
    },
    progressRange: {
        transform: [{rotate: "-90deg"}]
    },
    quickActionsContainer: {
        paddingHorizontal: 20,
        marginBottom: 2,
    },
    quickActionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 15,
        justifyContent: "center"
    },
    actionButton: {
       width: (width - 52) / 2,
       height: 100,
       borderRadius: 16,
       overflow: "hidden",
    },
    actionGradient: {
        flex: 1,
        padding: 15,
    },
    actionContent: {
        flex: 1,
        justifyContent: "space-between"
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    actionsLabel: {
        fontSize: 14,
        color: "white",
        fontWeight: 600,
        marginTop: 4
    },
    aectionTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: "#1a1a1a",
        marginBottom: 5
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: "#1a1a1a",
        marginBottom: 5
    },
    seeAllButton: {
        color: " #2E7D32",
        fontWeight: "600"
    },
    emtyState: {
        padding: 30,
        backgroundColor: "white",
        borderRadius: 16,
        marginTop: 10

    },
    emptyStateText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        marginBottom: 20
    },
    addMedicationButton: {
        backgroundColor: "#1a8e2d",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        color: "white"
    },
    addMedicationButtonText: {
        color: "white",
        fontWeight: 600,
    },
    doseCard: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 3,
    },
    doseBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        marginRight: 15
    },
    doseInfo: {
        flex: 1,
        justifyContent: "space-between"
    },
    doseTime: {
        flexDirection: "row",
        alignItems: "center"
    },
    timeText: {
        marginLeft: 5,
        color: "#666",
        fontSize: 14
    },
    takeDoseButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginLeft: 10
    },
    takeDoseText: {
        color: "white",
        fontWeight: 600,
        fontSize: 14
    },
     modalOverlay: {
        flex : 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end"
     },
     modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: "80%"
     },
     modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
     },
     modalTitle: {
        fontSize: 20,
        fontWeight: "bold", 
        color: "#333"
     },
     closeButton: {
        padding: 5,
     },
     notifcationIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E8F5E9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
     },
     notificationContent: {
        flex: 1,
     }, 
     notificationTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: "#333",
        marginBottom: 4,
     },
     notificationMessage: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4
     },
     notificationTime: {
        fontSize: 12,
        color: "#999"
     },
     notificationItem: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
        marginBottom: 10
     }

})