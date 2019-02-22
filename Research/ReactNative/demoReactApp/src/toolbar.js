import React from 'react';
import {StyleSheet, View, Text, Image } from 'react-native'
import { Toolbar, TabBar, Button, Icon } from 'react-native-ios-kit';

export default class ToolbarComponent extends React.Component {
    
    render(){
        return(
            // <View style={styles.container}>
                <View style ={styles.topBar}>
                    <View style={styles.topBarImage}>
                        <Image
                        style={styles.stretch}
                        source={require('./assets/gcdocs-logo.png')}
                        />
                    </View>
                    <View style ={styles.topBarLinks}>
                            <View style={styles.topBarItem}>
                                <Text style={styles.topBarText} inline>Home</Text>
                            </View>
                            <View style={styles.topBarItem}>
                                <Text style={styles.topBarText} inline>FR</Text>
                            </View>
                            <View style={styles.topBarItem}>
                                <Icon name={'ios-search'} size={22} color={'blue'}/>
                            </View>
                    </View>
                </View>
                    
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    //Wrapper de la flatlist
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 30,
    },

    topBar:{
        backgroundColor: 'white',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 65,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
         },
        shadowRadius: 5,
        shadowOpacity: 0.5
    },

    topBarLinks:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //backgroundColor: 'yellow'
    },
    topBarItem:{
        marginHorizontal: 7
    },
    stretch: {
        width:100,
        height: 100,
        marginLeft: 7,
        resizeMode: 'contain',
        justifyContent: 'flex-start',
    },
    topBarText:{
        fontSize: 20,
        color: 'blue',
        textDecorationLine: 'underline'
    }

});