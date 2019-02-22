import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import SelectInput from 'react-native-select-input-ios'
 
export default class FilterComp extends React.Component {

    constructor(props) {
        super(props);
        this.options = [{value: 0, label: 'All'},
                        {value: 1, label: 'Ascending'},
                        {value: 2, label: 'Descending'}]
      }

  render() {
    return (
    //   <View style={styles.container}>
      <View  style={styles.selectWrapper}>
        <SelectInput style={styles.select} labelStyle={styles.selectText} value={0} options={this.options} />
        <Ionicons name='ios-arrow-down' size={12} color='grey'/>
      </View>
        
    //   </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'red',
        
    },
    select: {
        marginHorizontal: 2,
        
    },
    selectText:{
        //fontSize: 20,
    },
    selectWrapper:{
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: 'black'
    }
});