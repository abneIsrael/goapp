import React, { Component } from 'react';
import api from '../services/api';

import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class NewTweet extends Component {

    //define as configuracoes do StackNavigator para esta tela
    
    static navigationOptions = ({ navigation }) => ({
        header: null, //Nesce caso, a barra fica oculta
    });

    state = {
        newTweet: '', //armazena o tweet digitado pelo usuario
    }

    goBack = () => {
        this.props.navigation.pop();
    }

    handleInputChange = (newTweet) => {
        this.setState({newTweet});//atualiza o estado e o imput conforme o usuario vai digitando
    }

    handleTweet = async () => {
        const content = this.state.newTweet;
        const author = await AsyncStorage.getItem('@Omnistack:username');

        await api.post('tweets', { author, content });

        this.goBack();
    }

    render () {
        return ( 
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={ this.goBack }>
                        <Icon name="close" size={24} color="#4BB0EE" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button} onPress={ this.handleTweet }>
                        <Text style={styles.buttonText}>Tweetar</Text>
                    </TouchableOpacity>
                </View>

                <TextInput 
                    style={styles.input} 
                    multiline //permite o componente receber varias linhas 
                    placeholder="O que está acontecendo?"
                    placeholderTextColor="#999"
                    value={this.state.newTweet} 
                    onChangeText={ this.handleInputChange }
                    onSubmitEditing={ this.handleTweet } //ativado quando teclar no botao enviar do teclado
                    returnKeyType="send" 
                />
            </SafeAreaView> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
  