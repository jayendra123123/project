import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Header({ currentPage, setCurrentPage }) {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#2563eb',
      paddingTop: 40, // space for status bar
      paddingBottom: 12,
      justifyContent: 'space-around'
    }}>
      {/* Home Button */}
      <TouchableOpacity onPress={() => setCurrentPage('home')}>
        <Text style={{
          color: currentPage === 'home' ? '#fff' : '#cbd5e1',
          fontSize: 18,
          fontWeight: currentPage === 'home' ? 'bold' : 'normal'
        }}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Schedule Button */}
      <TouchableOpacity onPress={() => setCurrentPage('schedule')}>
        <Text style={{
          color: currentPage === 'schedule' ? '#fff' : '#cbd5e1',
          fontSize: 18,
          fontWeight: currentPage === 'schedule' ? 'bold' : 'normal'
        }}>
          Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );
}
