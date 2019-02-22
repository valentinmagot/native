import React from 'react';
import { StyleSheet, Text, View, FlatList, Picker } from 'react-native';
import { Toolbar, ThemeProvider } from 'react-native-ios-kit'
import ListView from './listview';
import Swipe from './swipe'
import FilterComp from './filter';
import ToolbarComponent from './toolbar';
import Footer from './footer'


export default class Main extends React.Component {
  
  constructor(props){
    super (props);

    this.state = {
      filter: 'Select...'
    }
  }
  
  
  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.tabbar}>
          <ToolbarComponent />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Favorites</Text>
        </View>
        <View>
          <FilterComp/>
        </View>
        <View style={styles.listContainer}>
          <ListView/>
        </View>
        <View>
          <Footer/>
        </View>  
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    flexDirection: 'column',
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer:{
    marginLeft: 5,
    marginTop: 5,

  },
  title: {
    fontSize: 24,
  },
  
});
