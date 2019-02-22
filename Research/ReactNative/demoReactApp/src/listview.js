import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';
import FilterComp from './filter';


export default class ListView extends React.Component {
    constructor(props){
        super(props);

        this.swipeoutRightBtns = [
            {
              text: 'Email',
              backgroundColor: 'blue',
            },
          ]

        this.swipeoutLeftBtns = [
            {
              text: 'Download',
              backgroundColor: 'green',
            },
          ] 
    }
    render(){
        return(
            
            // <View style={styles.flatListWrapper}>
            <FlatList contentContainerStyle={styles.flatList}
                data={[{key: 'Change Request', icon:'md-folder'},
                        {key: 'GCdocs 16 - Gold Build Configuration', icon:'md-document'},
                        {key: 'OTDS FAQ', icon:'md-document'},
                        {key: 'Product and Features Analysis', icon:'md-folder'},
                        {key: 'GCdocs Technical FAQ', icon:'md-document'},
                        {key: 'Mobility Ebhancement', icon:'md-folder'},
                        {key: 'Promotional Material', icon:'md-folder'},
                        {key: 'Business Material', icon:'md-globe'},
                        ]}
                renderItem={({item}) => (
                <Swipeout style={styles.swipeout} buttonWidth={100} right={this.swipeoutRightBtns} left={this.swipeoutLeftBtns}>
                    <View style={styles.flatListLabelWrapper}>
                        <Ionicons name={item.icon} size={62} />
                        <Text style={styles.flatListText}> {item.key}</Text>
                    </View>
                </Swipeout>
                )}
            />
        // </View>
        );
    }
}

const styles = StyleSheet.create({
    //Wrapper de la flatlist
    flatListWrapper: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    //Wrapper de la flatlist
    flatList: {
        flexGrow: 1,
        justifyContent: 'center',

    },
    swipeout: {
        backgroundColor: 'white',
    },
    //Wrapper de chaque label
    flatListLabelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    flatListText: {
        color: 'blue',
        fontSize: 20,
        textDecorationLine: 'underline'
    }


});