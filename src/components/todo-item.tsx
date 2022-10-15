import React, {useContext, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TodoContext} from '../context';
import {colors} from '../theme/colors';
import {TodoContextType} from '../types/context';
import {TodoType} from '../types/todo';

interface Props extends TodoType {
  onComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

interface State {
  mode: 'view' | 'edit';
  todo: TodoType;
}

export default function TodoItem({id, title, completed, userId}: Props) {
  const {onDeleteTodo, onEditTodo, onCompleteTodo} = useContext(
    TodoContext,
  ) as TodoContextType;

  const [state, setState] = useState<State>({
    mode: 'view',
    todo: {title, completed, id, userId},
  });

  const onEdit = () => setState(prev => ({...prev, mode: 'edit'}));

  const onSave = () => {
    onEditTodo(id, {...state.todo});
    setState(prev => ({...prev, mode: 'view'}));
  };

  const onChangeText = (key: string, value: string) => {
    setState(prev => ({...prev, todo: {...prev.todo, [key]: value}}));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => onCompleteTodo(id)}
    >
      {state.mode === 'view' ? (
        <Text
          style={[
            styles.title,
            {
              textDecorationLine: completed ? 'line-through' : 'none',
              opacity: completed ? 0.2 : 1,
            },
          ]}
          // numberOfLines={2}
        >
          {title}
        </Text>
      ) : (
        <TextInput
          placeholder="What do you have planned?"
          style={styles.textinput}
          placeholderTextColor={'#AAAAAA50'}
          onChangeText={value => onChangeText('title', value)}
          value={state.todo.title}
          autoCorrect={false}
          autoCapitalize={'none'}
          autoFocus={true}
          multiline={true}
        />
      )}
      <View style={styles.right}>
        {state.mode === 'edit' ? (
          <Pressable>
            <Text style={styles.edit} onPress={onSave}>
              Save
            </Text>
          </Pressable>
        ) : (
          !completed && (
            <Text style={styles.edit} onPress={onEdit}>
              Edit
            </Text>
          )
        )}
        <View style={styles.rightSpace} />
        <Text style={styles.delete} onPress={() => onDeleteTodo(id)}>
          Delete
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_200 + '50',
    marginTop: 10,
    paddingVertical: 5,
  },
  title: {
    flex: 1,
    color: colors.yellow_500,
    textDecorationColor: colors.blue_100,
    textDecorationStyle: 'double',
  },
  right: {flexDirection: 'row', marginLeft: 10},
  edit: {color: colors.blue_400},
  delete: {color: 'red'},
  rightSpace: {width: 30},
  textinput: {
    height: '100%',
    flex: 1,
    backgroundColor: colors.blue_300,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: colors.yellow_500,
    fontSize: 14,
  },
});
