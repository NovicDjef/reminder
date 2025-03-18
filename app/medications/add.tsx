import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'react-native-svg'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from "@react-native-community/datetimepicker"

const FREQUENCIES = [
    {
        id: "1",
        label: "Once daily",
        icon: "sunny-outline" as const,
        times: ["07:30"],
    },
    {
        id: "2",
        label: "Twice daily",
        icon: "sync-outline" as const,
        times: ["07:30", "21:20"],
    },
    {
        id: "3",
        label: "Three times daily",
        icon: "time-outline" as const,
        times: ["07:30", "13:20", "21:00"],
    },
    {
        id: "4",
        label: "Four times daily",
        icon: "repeat-outline" as const,
        times: ["07:30", "13:20", "17:00", "21:00"],
    },
    {
        id: "5",
        label: "As needed",
        icon: "calendar-outline" as const,
        times: ["07:30", "13:20", "17:30", "23:00"],
    }
]
const DURATIONS = [
    { id: "1", label: "7 days", value: 7},
    { id: "2", label: "14 days", value: 14},
    { id: "3", label: "30 days", value: 30},
    { id: "4", label: "90 days", value: 90},
    { id: "5", label: "Ongoing", value: -1},
]
export default function AddMedicationScreen() {
    const [form, setForm] = useState({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        startDate: new Date(),
        times: ["07:00"],
        notes: "",
        reminderEnabled: true,
        refillReminder: false,
        currentSupply: "",
        refillAt: "",
    })
  const renderFrequenceOption = () => {
    return(
        <View>
            {FREQUENCIES.map((freq) => (
                <TouchableOpacity
                key={freq.id}
                >
                    <View>
                        <Ionicons name={freq.icon} size={24} />
                        <Text>{freq.label}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
  }

  const renderDurationOption = () => {
    return(
        <View>
        {DURATIONS.map((dur) => (
            <TouchableOpacity
            key={dur.id}
            >
                <View>
                    
                </View>
                <View>
                    <Text>{dur.value > 0 ? dur.value : "***"}</Text>
                    <Text>{dur.label}</Text>
                </View>
            </TouchableOpacity>
        ))}
    </View>
    )
  }

  return (
    <View>
      <LinearGradient 
        colors={["#1a8e2d", "#146922"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
        <View>
            <View>
                <TouchableOpacity>
                    <Ionicons name="chevron-back" size={28} color="#1a8e2d" />
                </TouchableOpacity>
                <Text> New Medication</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View>
                    <View>
                        <TextInput 
                            placeholder='Medication Name'
                            placeholderTextColor={'#999'}

                        />
                    </View>
                    <View>
                        <TextInput 
                            placeholder='Dosage (e.g., 500mg )'
                            placeholderTextColor={'#999'}

                        />
                    </View>
                    <View>
                        <Text>How often ?</Text>
                        {renderFrequenceOption()}

                        <Text>For how long</Text>
                        {renderDurationOption()}

                        <TouchableOpacity>
                            <View>
                                <Ionicons name="calendar" size={20} color={"#1a8e2d"}/>
                            </View>
                            <View>
                                Start { }
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker 
                            value={form.startDate}
                            mode="date"
                             
                        />  
                        <DateTimePicker mode='time'
                            value={(() => {
                                const [hours, minutes] = form.times[0].split(":").map(Number);
                                const date = new Date();
                                date.setHours(hours, minutes, 0, 0);
                                return date;
                            })()}/>
                    </View>
                </View>
                {/* reminders */}
                <View>
                    <View>
                        <View>
                            <View>
                                <View>
                                    <Ionicons name="notifications" size={24} color="#1a8e2d" />
                                </View>
                                <View>
                                    <Text>Reminders</Text>
                                    <Text>Get notified when its time to take your medications</Text>
                                </View>
                            </View>
                            <Switch
                                thumbColor={"white"}
                                trackColor={{ false: "#ddd", true: "#1a8e2d"}} />
                        </View>
                    </View>
                </View>
                {/* Refill Traking */}
                <View>

                </View>
                {/* Notes */}
                <View>
                    <TextInput 
                        placeholder="Add notes or specail instructions..."
                        placeholderTextColor="#999"
                    />
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity>
                    <LinearGradient 
                        colors={["#1a8e2d", "#146922"]}
                        start={{ x: 0, y: 0}}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text> 
                            {/* {isSubmitting ? "Adding..." : "Add Medication"} */}
                            Add Medication 
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contairner: {
        flex: 1,
    }
})