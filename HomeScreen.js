import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function HomeScreen({ tasks, onAddTask, onEditTask, onToggleTask, onDeleteTask, isOverdue, formatDate, showSchedules, setShowSchedules, selectedDay, setSelectedDay }) {
  // Helper to get weekday name from a Date
  const getWeekDay = (date) => WEEK_DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1];

  const sortedTasks = [...tasks].sort((a, b) => a.date - b.date);
  // Only show today's tasks in My Tasks view
  const today = new Date();
  const todayWeekDay = getWeekDay(today);
  const upcomingTasks = sortedTasks.filter(task => {
    const d = (task.date instanceof Date) ? task.date : new Date(task.date);
    return !task.completed && getWeekDay(d) === todayWeekDay;
  });
  const completedTasks = sortedTasks.filter(task => {
    const d = (task.date instanceof Date) ? task.date : new Date(task.date);
    return task.completed && getWeekDay(d) === todayWeekDay;
  });

  // Filter tasks for selected day, always parse date as Date object
  const dayTasks = selectedDay
    ? sortedTasks.filter(task => {
        const d = (task.date instanceof Date) ? task.date : new Date(task.date);
        return getWeekDay(d) === selectedDay;
      })
    : [];

  const TaskCard = ({ task }) => {
    const d = (task.date instanceof Date) ? task.date : new Date(task.date);
    const weekDay = getWeekDay(d);
    return (
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, borderLeftWidth: 6, borderLeftColor: isOverdue(task.date) ? '#f87171' : task.completed ? '#22c55e' : '#2563eb', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity
              onPress={() => onToggleTask(task.id)}
              style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: task.completed ? '#22c55e' : 'transparent', borderColor: task.completed ? '#22c55e' : '#ccc', marginRight: 16 }}
            >
              {task.completed && <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>✓</Text>}
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: task.completed ? '#888' : '#222', textDecorationLine: task.completed ? 'line-through' : 'none', fontSize: 18, lineHeight: 24 }}>{`(${weekDay}) ${task.title}`}</Text>
              <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>
                <Text style={{ color: isOverdue(task.date) && !task.completed ? 'red' : '#666', fontWeight: isOverdue(task.date) && !task.completed ? 'bold' : 'normal', marginRight: 12, fontSize: 16 }}>{formatDate(task.date)}</Text>
                {isOverdue(task.date) && !task.completed && (
                  <View style={{ backgroundColor: '#fee2e2', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 }}>
                    <Text style={{ color: '#b91c1c', fontSize: 14, fontWeight: 'bold' }}>Overdue</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 12 }}>
            <TouchableOpacity
              onPress={() => onEditTask(task)}
              style={{ padding: 12, borderRadius: 12, backgroundColor: '#e0e7ff', minWidth: 64, alignItems: 'center', marginRight: 8 }}
            >
              <Text style={{ color: '#2563eb', fontSize: 16, fontWeight: 'bold' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDeleteTask(task.id)}
              style={{ padding: 12, borderRadius: 12, backgroundColor: '#fee2e2', minWidth: 64, alignItems: 'center' }}
            >
              <Text style={{ color: '#b91c1c', fontSize: 16, fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
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
      <View style={{ padding: 16, minHeight: '100%', position: 'relative', zIndex: 1 }}>
        {!showSchedules ? (
          <>
            <View style={{ alignItems: 'center', marginBottom: 24, marginTop: 12 }}>
              <Text style={{ fontSize: 36, fontWeight: '800', textAlign: 'center', marginBottom: 8, color: '#1e293b' }}>My Tasks</Text>
              <Text style={{ color: '#64748b', fontSize: 18, textAlign: 'center', marginBottom: 20, lineHeight: 24 }}>Stay organized and get things done 🚀</Text>
            </View>
            <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 24, shadowColor: '#1e293b', shadowOpacity: 0.1, shadowRadius: 16, elevation: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ alignItems: 'center', marginRight: 32 }}>
                    <Text style={{ fontSize: 32, fontWeight: '800', color: '#2563eb' }}>{upcomingTasks.length}</Text>
                    <Text style={{ color: '#64748b', fontSize: 16, fontWeight: '600' }}>📋 Pending</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 32, fontWeight: '800', color: '#16a34a' }}>{completedTasks.length}</Text>
                    <Text style={{ color: '#64748b', fontSize: 16, fontWeight: '600' }}>✅ Completed</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={onAddTask}
                style={{ backgroundColor: '#2563eb', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#2563eb', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
              >
                <Text style={{ color: 'white', fontSize: 24, marginRight: 12, fontWeight: 'bold' }}>+</Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Add New Task</Text>
              </TouchableOpacity>
            </View>
            {tasks.length === 0 ? (
              <View style={{ alignItems: 'center', paddingVertical: 60, backgroundColor: '#fff', borderRadius: 20, marginBottom: 24, shadowColor: '#1e293b', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 }}>
                <Text style={{ fontSize: 64, marginBottom: 24 }}>📅</Text>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 12 }}>No tasks yet</Text>
                <Text style={{ color: '#64748b', marginBottom: 32, fontSize: 18, textAlign: 'center', lineHeight: 24 }}>Get started by adding your first task!</Text>
                <TouchableOpacity
                  onPress={onAddTask}
                  style={{ backgroundColor: '#6366f1', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#6366f1', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
                >
                  <Text style={{ color: 'white', fontSize: 24, marginRight: 12, fontWeight: 'bold' }}>+</Text>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Add Your First Task</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {upcomingTasks.length > 0 && (
                  <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 16 }}>🔥 Today's Tasks</Text>
                    {upcomingTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </View>
                )}
                {completedTasks.length > 0 && (
                  <View>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 16 }}>✅ Completed Today</Text>
                    {completedTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </View>
                )}
              </View>
            )}
          </>
        ) : (
          <>
            {/* Schedules Week View */}
            {!selectedDay ? (
              <View>
                <View style={{ alignItems: 'center', marginBottom: 32, marginTop: 12 }}>
                  <Text style={{ fontSize: 36, fontWeight: '800', textAlign: 'center', marginBottom: 8, color: '#1e293b' }}>Weekly Schedule</Text>
                  <Text style={{ color: '#64748b', fontSize: 18, textAlign: 'center', marginBottom: 20, lineHeight: 24 }}>Plan your week ahead 📅</Text>
                </View>
                <View style={{ marginBottom: 24 }}>
                  {WEEK_DAYS.map(day => {
                    const tasksForDay = sortedTasks.filter(task => {
                      const d = (task.date instanceof Date) ? task.date : new Date(task.date);
                      const match = getWeekDay(d) === day;
                      if (match) {
                        // Debug: log matching tasks
                        console.log('Task for', day, ':', task.title, d, getWeekDay(d));
                      }
                      return match;
                    });
                    return (
                      <TouchableOpacity
                        key={day}
                        onPress={() => setSelectedDay(day)}
                        style={{ backgroundColor: '#2563eb', borderRadius: 16, paddingVertical: 20, paddingHorizontal: 24, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#2563eb', shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 }}
                      >
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>{day}</Text>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 }}>
                          <Text style={{ color: '#ffd700', fontSize: 16, fontWeight: 'bold' }}>{tasksForDay.length} task{tasksForDay.length !== 1 ? 's' : ''}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View style={{ flex: 1, minHeight: 400 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, marginTop: 12 }}>
                  <TouchableOpacity onPress={() => setSelectedDay(null)} style={{ backgroundColor: '#e0e7ff', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 }}>
                    <Text style={{ color: '#2563eb', fontSize: 18, fontWeight: 'bold' }}>{'← Back'}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 28, fontWeight: '800', color: '#1e293b' }}>{selectedDay}</Text>
                  <TouchableOpacity
                    onPress={onAddTask}
                    style={{ backgroundColor: '#2563eb', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#2563eb', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
                  >
                    <Text style={{ color: 'white', fontSize: 20, marginRight: 8, fontWeight: 'bold' }}>+</Text>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Add</Text>
                  </TouchableOpacity>
                </View>
                {dayTasks.length === 0 ? (
                  <View style={{ alignItems: 'center', paddingVertical: 60, backgroundColor: '#fff', borderRadius: 20, shadowColor: '#1e293b', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 }}>
                    <Text style={{ fontSize: 64, marginBottom: 24 }}>📅</Text>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 12 }}>No tasks for {selectedDay}</Text>
                    <Text style={{ color: '#64748b', marginBottom: 32, fontSize: 18, textAlign: 'center' }}>Add your first task for this day!</Text>
                    <TouchableOpacity
                      onPress={onAddTask}
                      style={{ backgroundColor: '#6366f1', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#6366f1', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
                    >
                      <Text style={{ color: 'white', fontSize: 24, marginRight: 12, fontWeight: 'bold' }}>+</Text>
                      <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Add Task</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    {dayTasks.map(task => <TaskCard key={task.id} task={task} />)}
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
