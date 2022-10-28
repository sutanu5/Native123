import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';

const Signup = props => {

  const [user, setUser] = useState({
    name:"",
    email:"",
    gender:"",
    password:"",
    confirm_password:""
  });
  const [inputError, setInputError] = useState({
    name:null,
    email:null,
    gender:null,
    password:null,
  });

  const submitSignup = async() => {
    console.log('signup');
    console.log("user:", user);
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        console.log("value",value);
      }
    } catch(e) {
      console.log("error",value);
    }
  };

  const onChangeInput = (data)=>{
    validator(data.name);
    console.log("input name: ",data.name);
    console.log("input value: ", data.value);
     setUser({...user, [data.name]:data.value});
  }
  const validator = (name) => {
    console.log("length:",user.name.length);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(name == "email"){
        if(reg.test(user.email)){
            setInputError({...inputError, email : null});
        }else{
            setInputError({...inputError, email : "Invalid email"})}
    }else if(name == "name"){
        (user.name.length < 5)?
        setInputError({...inputError, name : "min length 5"}):setInputError({...inputError, name : null});
    }else if(name == "password"){   
        (user.password.length < 8)?
        setInputError({...inputError, password : "min length 8"}):setInputError({...inputError, password : null});
    }
  }
  return (
    <Background>
      <View style={{alignItems: 'center', width: 400}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field 
            placeholder="Full Name"
            onChangeText={(value) => onChangeInput({value:value,name:"name"})}
          />
          {!!inputError.name && (
            <Text style={{ color: "red", paddingLeft:30, paddingBottom:10}}>{inputError.name}</Text>
          )}
          
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
            onChangeText={(value) => onChangeInput({value:value,name:"email"})}
          />
          {!!inputError.email && (
            <Text style={{ color: "red", paddingLeft:30, paddingBottom:10}}>{inputError.email}</Text>
          )}
          <Field placeholder="Gender" onChangeText={(value) => onChangeInput({value:value,name:"gender"})} />
          {!!inputError.gender && (
            <Text style={{ color: "red", paddingLeft:30, paddingBottom:10}}>{inputError.gender}</Text>
          )}
          <Field placeholder="Password" secureTextEntry={true} onChangeText={(value) => onChangeInput({value:value,name:"password"})} />
          {!!inputError.password && (
            <Text style={{ color: "red", paddingLeft:30, paddingBottom:10}}>{inputError.password}</Text>
          )}
          <Field placeholder="Confirm Password" secureTextEntry={true} onChangeText={(value) => onChangeInput({value:value,name:"confirm_password"})} />
          {!!inputError.confirm_password && (
            <Text style={{ color: "red", paddingLeft:30, paddingBottom:10}}>{inputError.confirm_password}</Text>
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
              
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              and {" "}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={submitSignup}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;