import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import EventScreen from './EventScreen';
import { View, TouchableOpacity, Text, Alert } from 'react-native';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      date: new Date(2025, 7, 12, 14, 30),
      completed: false
    },
    {
      id: 2,
      title: "Team meeting",
      date: new Date(2025, 7, 15, 10, 0),
      completed: false
    }
  ]);
  const [editingTask, setEditingTask] = useState(null);
  const [showSchedules, setShowSchedules] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => setTasks(tasks.filter(task => task.id !== id)) }
      ]
    );
  };

  const isOverdue = (date) => new Date() > date;

  const formatDate = (date) => {
    return date.toLocaleDateString() + ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {currentPage === 'home' ? (
          <HomeScreen
            tasks={tasks}
            onAddTask={() => {
              // If in Schedules day view, pre-select that day for the new task
              if (showSchedules && selectedDay) {
                // Find the next date for the selected weekday
                const today = new Date();
                const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const targetDay = WEEK_DAYS.indexOf(selectedDay);
                // getDay: 0=Sunday, 1=Monday, ..., 6=Saturday
                let daysToAdd = (targetDay + 1 - today.getDay());
                if (daysToAdd < 0) daysToAdd += 7;
                const nextDate = new Date(today);
                nextDate.setDate(today.getDate() + daysToAdd);
                nextDate.setHours(9, 0, 0, 0); // Default to 9:00 AM
                setEditingTask({
                  id: Date.now(),
                  title: '',
                  date: nextDate,
                  completed: false
                });
                setCurrentPage('event');
              } else {
                setEditingTask(null);
                setCurrentPage('event');
              }
            }}
            onEditTask={task => { setEditingTask(task); setCurrentPage('event'); }}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            isOverdue={isOverdue}
            formatDate={formatDate}
            showSchedules={showSchedules}
            setShowSchedules={setShowSchedules}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        ) : (
          <EventScreen
            editingTask={editingTask}
            onSave={taskData => {
              if (editingTask) {
                setTasks(tasks.map(task => task.id === editingTask.id ? taskData : task));
              } else {
                setTasks([...tasks, taskData]);
              }
              setCurrentPage('home');
              // If we were in Schedules day view, keep selectedDay and showSchedules
              if (showSchedules && selectedDay) {
                setShowSchedules(true);
                setSelectedDay(selectedDay);
              } else {
                setShowSchedules(false);
                setSelectedDay(null);
              }
              setEditingTask(null);
            }}
            onCancel={() => { setCurrentPage('home'); setEditingTask(null); }}
          />
        )}
      </View>
      {/* Bottom Navigation Bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, backgroundColor: '#2563eb' }}>
        <TouchableOpacity onPress={() => { setCurrentPage('home'); setShowSchedules(false); setSelectedDay(null); }}>
          <Text style={{ color: showSchedules ? '#fff' : '#ffd700', fontWeight: !showSchedules ? 'bold' : 'normal', fontSize: 18 }}>My Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setCurrentPage('home'); setShowSchedules(true); setSelectedDay(null); }}>
          <Text style={{ color: showSchedules ? '#ffd700' : '#fff', fontWeight: showSchedules ? 'bold' : 'normal', fontSize: 18 }}>Schedules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default App;