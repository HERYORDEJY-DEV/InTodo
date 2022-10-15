import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TodoInput from '../components/todo-input';
import TodoList from '../components/todo-list';
import {colors} from '../theme/colors';

const currentDate = new Date().toLocaleDateString('en-gb', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function Todos() {
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.headingTitle}>InTodo</Text>
        <Text style={styles.headingDate}>{currentDate}</Text>
      </View>
      <TodoInput />
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: colors.blue_100},
  headingWrapper: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.blue_400,
  },
  headingTitle: {
    fontSize: 38,
    color: colors.blue_400,
    fontWeight: 'bold',
    height: 40,
  },
  headingDate: {
    fontSize: 16,
    color: colors.yellow_500,
    fontWeight: 'bold',
  },
});
