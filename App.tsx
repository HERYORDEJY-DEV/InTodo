/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import TodoProvider from './src/context';
import Todos from './src/screens/todos';
import {colors} from './src/theme/colors';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: colors.blue_100,
  };

  return (
    <TodoProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.blue_100}
        />
        {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="Step One">
        Edit <Text style={styles.highlight}>App.tsx</Text> to change this
        screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
        <ReloadInstructions />
        </Section>
        <Section title="Debug">
        <DebugInstructions />
        </Section>
        <Section title="Learn More">
        Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
        </View>
      </ScrollView> */}
        <Todos />
      </SafeAreaView>
    </TodoProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
