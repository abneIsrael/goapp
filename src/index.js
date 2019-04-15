/**
 * 
 * COMPONENT: App
 * Componente principal da aplicacao.
 * 
 * Esse é um stateless component,
 * ou seja, um componente que nao 
 * possui estado.
 * 
 * Assim ele pode ser escrito como 
 * arrow function
 * 
 */

import React from 'react';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Unrecognized WebSocket']); // Remove o aviso de Warnning da tela do app

import Routes from './routes';

const App = () => <Routes />;

export default App;