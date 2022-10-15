import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TodoContext} from '../context';
import {colors} from '../theme/colors';
import {TodoContextType} from '../types/context';
import {TodoType} from '../types/todo';
import TodoItem from './todo-item';

export default function TodoList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const {onLoadTodos, todos} = useContext(TodoContext) as TodoContextType;

  const renderItem = useCallback(
    ({item}: {item: TodoType}) => (
      <TodoItem
        {...item}
        onComplete={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    ),
    [],
  );

  const keyExtractor = useCallback(({id}: {id: number}) => `${id}`, []);

  async function loadTodos() {
    setIsError(false);
    await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        if (!data?.length) {
          setIsError(true);
          return false;
        }
        return data;
      })
      .then(onLoadTodos)
      .catch(error => {})
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 'large' : 100}
            color={colors.yellow_500}
          />
        </View>
      ) : isError ? (
        <View style={styles.loaderWrapper}>
          <Text style={styles.errorText}>
            Ouch!!! Unable to fetch todos at the moment.{'\n'}Try again, later
          </Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainer}
        />
      )}
      {!isLoading && isError && (
        <Text style={styles.refresh} onPress={loadTodos}>
          Refresh
        </Text>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {paddingBottom: 60},
  loaderWrapper: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  refresh: {
    color: colors.blue_400,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
