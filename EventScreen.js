import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function EventScreen({ editingTask, onSave, onCancel }) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [date, setDate] = useState(
    editingTask
      ? new Date(editingTask.date).toISOString().slice(0, 16)
      : new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)
  );

  useEffect(() => {
    setTitle(editingTask?.title || '');
    setDate(
      editingTask
        ? new Date(editingTask.date).toISOString().slice(0, 16)
        : new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)
    );
  }, [editingTask]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    onSave({
      id: editingTask?.id || Date.now(),
      title: title.trim(),
      date: new Date(date),
      completed: editingTask?.completed || false
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
      {/* Top transparent blue overlay */}
      <View style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '25%', 
        backgroundColor: 'rgba(37, 99, 235, 0.05)', 
        zIndex: 0 
      }} />
      <View style={styles.gradientBg}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Text style={styles.header}>{editingTask ? '✏️ Edit Task' : '📝 Add New Task'}</Text>
            <Text style={{ color: '#64748b', fontSize: 16, textAlign: 'center', marginTop: 8 }}>
              {editingTask ? 'Update your task details' : 'Create a new task to stay organized'}
            </Text>
          </View>
          
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.label}>Task Description *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="What do you need to do?"
              style={styles.input}
              multiline
              numberOfLines={3}
              placeholderTextColor="#9ca3af"
              textAlignVertical="top"
            />
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text style={styles.label}>Due Date & Time *</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DDTHH:MM (e.g., 2025-08-15T14:30)"
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, !title.trim() && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={!title.trim()}
            >
              <Text style={styles.buttonText}>{editingTask ? '💾 Update Task' : '✅ Add Task'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={[styles.buttonText, { color: '#2563eb' }]}>❌ Cancel</Text>
            </TouchableOpacity>
          </View>

          {title ? (
            <View style={styles.previewBox}>
              <Text style={styles.previewLabel}>📋 Preview:</Text>
              <Text style={styles.previewTitle}>{title}</Text>
              <Text style={styles.previewDate}>
                ⏰ Due: {new Date(date).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    minHeight: 600,
    padding: 16,
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    shadowColor: '#1e293b',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    fontSize: 18,
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    minHeight: 60,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    color: '#374151',
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'column',
    gap: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#e2e8f0',
    shadowColor: '#64748b',
    shadowOpacity: 0.2,
  },
  previewBox: {
    marginTop: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#2563eb',
  },
  previewLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#2563eb',
  },
  previewTitle: {
    fontSize: 20,
    color: '#1e293b',
    marginBottom: 8,
    fontWeight: '600',
    lineHeight: 28,
  },
  previewDate: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
});
