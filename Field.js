import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100 ,padding:7, color: darkGreen, paddingHorizontal: 20, width: '74%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 15}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};

export default Field;
