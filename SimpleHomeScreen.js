import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SimpleHomeScreen() {
  const [tasks] = React.useState([]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>Stay organized and productive 🚀</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.emptyText}>📅</Text>
        <Text style={styles.emptyTitle}>Ready to build!</Text>
        <Text style={styles.emptySubtitle}>Your task app is ready for distribution</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#1e293b',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});
