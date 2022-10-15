import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {TodoContext} from '../context';
import {colors} from '../theme/colors';
import {TodoContextType} from '../types/context';
import {TodoType} from '../types/todo';

export default function TodoInput() {
  const {onAddTodo, todos} = useContext(TodoContext) as TodoContextType;

  const [state, setState] = useState<TodoType>({
    title: '',
    id: todos.length,
    userId: 0,
    completed: false,
  });

  const onChangeText = (key: string, value: string) => {
    setState(prev => ({...prev, [key]: value}));
  };

  const onAddTask = () => {
    onAddTodo({...state});
    onChangeText('title', '');
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder="What do you have planned?"
        style={styles.textinput}
        placeholderTextColor={'#AAAAAA50'}
        onChangeText={value => onChangeText('title', value)}
        value={state.title}
      />
      <View style={styles.space} />
      <Pressable
        style={styles.addButton}
        onPress={onAddTask}
        disabled={!Boolean(state.title)}
      >
        <Text
          style={[
            styles.addButtonText,
            {opacity: Boolean(state.title) ? 1 : 0.2},
          ]}
        >
          Add task
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.blue_400,
  },
  textinput: {
    height: '100%',
    flex: 1,
    backgroundColor: colors.blue_300,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: colors.yellow_500,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: colors.blue_400,
    borderRadius: 5,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: colors.blue_200,
    fontWeight: '600',
  },
  space: {width: 10},
});
