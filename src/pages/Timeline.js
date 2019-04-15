import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import AsyncStorage from '@react-native-community/async-storage';

import { ActivityIndicator, View, FlatList, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

import ActionButton from 'react-native-action-button';

import Icon from 'react-native-vector-icons/FontAwesome';

import Tweet from '../components/Tweet';


export default class Timeline extends Component {
    //define as configuracoes do StackNavigator para esta tela
    static navigationOptions = ({ navigation }) => ({
        title: "TimeLine",
        headerRight: (
            // Faz logoff do usuario
            <TouchableOpacity onPress={ () => {
                AsyncStorage.setItem('@Omnistack:username', '');
                navigation.navigate('Login');
            } }>
                <Text style={ {paddingRight:20, color:"#4BB0EE", fontSize:15} }>Sair</Text>
            </TouchableOpacity>
        ),
    });

    state = {
        tweets: [],
    }

    async componentDidMount () {
        this.subscribeToEvents();
        
        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }

    //encapsula numa unica funcao o nosso realtime
    subscribeToEvents = () => {
        const io = socket('http://10.0.0.113:3000');//estabelece conexao com server

        io.on('tweet', data => {
            console.log(data)
            this.setState({ tweets: [data, ...this.state.tweets] }); //Recria o array de tweets, com o mais novo no inicio //... operador 'spraid', pega todos os valores de um objeto
        });

        io.on('like', data => {
            this.setState({ tweets : this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet) })
        });
    };

    render() {
        return (
            <View style={styles.container} >
                <FlatList 
                    data={this.state.tweets} //o conteudo para os itens da lista
                    keyExtractor={ tweet => tweet._id }
                    renderItem={ ({ item }) => <Tweet tweet={ item } /> }
                />
                <ActionButton buttonColor={styles.actionButton.color} renderIcon={active => active ? (<Icon name="plus" size={15} color="#FFF"/> ) : (<Icon name="twitter" size={20} color="#FFF"/> ) } >
                    <ActionButton.Item buttonColor='#3498db' title="Tweet a Message" onPress={ () => this.props.navigation.navigate('NewTweet') }>
                    <Icon name="twitter" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#9b59b6' title="Tweet from Galery" onPress={() => {}}>
                    <Icon name="camera" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },

    actionButton: {
        color:'#4BB0EE',
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },

      loadingIndicator: {
          paddingTop: 10,
      }

});
  