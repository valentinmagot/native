import React from 'react';
import {StyleSheet, View, Text, Image } from 'react-native'
import { Toolbar, TabBar, Button, Icon } from 'react-native-ios-kit';

export default class Footer extends React.Component {
    
    render(){
        return(
            // <View style={styles.container}>
                <View style ={styles.topBar}>
                    <View style ={styles.topBarLinks}>
                            <View style={styles.topBarItem}>
                                <Icon name={'ios-help'} size={42} color={'black'}/>
                            </View>
                            <View style={styles.topBarItem}>
                                <Text style={styles.topBarText} inline>Help and support</Text>
                            </View>
                    </View>
                    <View style={styles.topBarImage}>
                        <Image
                        style={styles.stretch}
                        source={require('./assets/sig-pspc-en.jpg')}
                        />
                    </View>
                </View>
                    
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    //Wrapper de la flatlist
    container: {
        backgroundColor: 'red',
        flexGrow: 1,
        justifyContent: 'center'
    },

    topBar:{
        backgroundColor: 'white',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        // justifyContent: 'space-between',
        flexDirection: 'column',
        height: 150,
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

    topBarImage: {
        height: 50,
        width: 350,
        //backgroundColor: 'blue'
    },
    stretch: {
        marginLeft: 7,
        height: 50,
        width: 350,
        //backgroundColor: 'green',
        resizeMode: 'center',
        justifyContent: 'flex-start',
    },
    topBarText:{
        fontSize: 20,
        color: 'blue',
        textDecorationLine: 'underline'
    }

});