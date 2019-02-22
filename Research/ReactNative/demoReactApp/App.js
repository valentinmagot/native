import React from 'react';
import { StyleSheet, Text, View, FlatList, Picker } from 'react-native';
import { Toolbar, ThemeProvider } from 'react-native-ios-kit'
import Main from './src/main';
import Footer from './src/footer';


export default class App extends React.Component {
  
  render() {
    return (
      
      <ThemeProvider>
        <Main/>
      </ThemeProvider>
    );
  }
}

