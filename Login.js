import React,{useState} from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';

const Login = (props) => {

  const [user, setUser] = useState({
    email:"",
    password:""
  });
  const [inputError, setInputError] = useState({
    email:null,
    password:null
  });


  const submitSignin = async(e) => {
    console.log('signin');
    console.log("user:", user);
    if(user.email == "sutanu@sain.com" && user.password=="1234567890"){
        console.log('login successful');
        alert('login successful');
    }else{
        console.log('username or password wrong');
        alert('username or password wrong');
    }
    try {
      await AsyncStorage.setItem('@storage_Key', "sutanu vip");
      console.log('ssss');
    } catch (e) {
      console.log('eee', e);
    }
  };

  const onChangeInput = (data)=>{
    validator(data.name);
    console.log("input name: ",data.name);
    console.log("input value: ", data.value);
     setUser({...user, [data.name]:data.value});
  }
  const validator = (name) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(name == "email"){
        if(reg.test(user.email)){
            setInputError({...inputError, email : null});
        }else{
            setInputError({...inputError, email : "Invalid email"})}
    }else if(name == "password"){   
        (user.password.length < 8)?
        setInputError({...inputError, password : "min length 8"}):setInputError({...inputError, password : null});
    }    
  }
 
  return (
    <Background>
      <View style={{alignItems: 'center', width:400}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
            onChangeText={(value) => onChangeInput({value:value,name:"email"})}
          />
          {!!inputError.email && (
            <Text style={{ color: "red", paddingLeft:30, paddingBottom:10}}>{inputError.email}</Text>
          )}
          <Field 
            placeholder="Password" 
            secureTextEntry={true}
            keyboardType="email-address"
            onChangeText={(value) => onChangeInput({value:value,name:"password"})}
          />
          {!!inputError.password && (
            <Text style={{ color: "red", paddingLeft:30, paddingBottom:10}}>{inputError.password}</Text>
          )}
          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={submitSignin} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;