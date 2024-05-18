import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './login.css';
import userLogin from '../../functions/loginHandler.js';
import conquerLogoBgRemoved from './logo.png'; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    async function onSignInPressed(e) {
        e.preventDefault(); // Prevent default form submission behavior
        if (email === "" || password === "") {
            console.log("Missing Input");
        } else {
            try {
                await userLogin(email, password);
                navigate('/home');
                return;
            } catch (error) {
                if (error.code === "auth/invalid-email") {
                    console.log('Invalid Login');
                } else {
                    console.log('An error occurred during login');
                }
            }
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);  // Updating the password state with each input
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);  // Updating the password state with each input
    };

    function navigateToRegister() {
        navigate('/register');
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={conquerLogoBgRemoved} alt="Conquer Logo" style={{ width: '100px', marginBottom: '20px', margin: '0 auto' }} /> {/* Use the imported logo */}
                <h2>Sign In</h2>
                <form onSubmit={onSignInPressed}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">JOIN</button>
                </form>
                <p>
                    Don’t have an account? <a href="/register" onClick={navigateToRegister}>Sign up.</a>
                </p>
            </div>
        </div>
    );
}

export default Login;



/* Backup 2
import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import './login.css';
import userLogin from '../../functions/loginHandler.js';

function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    async function onSignInPressed(){
        if (email === "" || password === "") {
            console.log("Missing Input");
        } else {
            try {
                await userLogin(email, password);
                navigate('/home');
                return;
            } catch (error) {
                if (error.code === "auth/invalid-email") {
                    console.log('Invalid Login');
                } else {
                    console.log('An error occurred during login');
                }
            }
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);  // Updating the password state with each input
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);  // Updating the password state with each input
    };

    function navigateToRegister(){
        navigate('/register');
    }
    
    return(
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="headerText">
                    Welcome Back!
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="Email">
                <TextField
                    required
                    id="emailField"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className="Password">
                <TextField
                    required
                    id="passwordField"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
            </Grid>
            <Grid xs={12}>
                <div className="Submit">
                <Button variant="contained" size="large" onClick={onSignInPressed}>
                    Log in
                </Button>
                </div>
            </Grid>
            <Grid xs={12}>
                <div className="register">
                    
                    <Button size="small" onClick={navigateToRegister} >Don't have an account? Register here</Button>
                </div>
            </Grid>
        </Grid>
    )
}

export default Login; */


// import { useState } from 'react'
// import { Platform, Alert, Pressable, Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
// import Logo from '../../../assets/icon.png';
// import CustomInput from "../../components/CustomInput";
// import CustomButton from '../../components/CustomButton';
// import { useRouter, Stack } from 'expo-router';
// import userLogin from '../../functions/login.js';
// import { Link, router } from "expo-router";
// import sessionStorage from '../../functions/sessionStorage';

// const Login = () => {
//     const router = useRouter();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     const { height } = useWindowDimensions();

//     const onSignInPressed = async () => {

//         // if (email != '' && password != '') {

//         //     let output = await userLogin(email, password);

//         //     if ('status' in output) {
//         //         if (output.status == 200) {
//         //             let key = sessionStorage.sessionKey;
//         //             setMessage(`SessionKey: ", ${key}`)
//         //             router.push({
//         //                 pathname: "/",
//         //             })

//         //         }
//         //     }

//         // }
//         if (email === "" || password === "") {
//             setErrorMessage("Missing Input");
//         } else {
//             try {
//                 await userLogin(email, password);
//                 router.push({
//                     pathname: "/",
//                 });
//                 return;
//             } catch (error) {
//                 if (error.code === "auth/invalid-email") {
//                     setErrorMessage('Invalid Login');
//                 } else {
//                     setErrorMessage('An error occurred during login');
//                 }
//             }
//         }

//         // Show alert if there's an error message
//         if (errorMessage && (Platform.OS === 'ios' || Platform.OS === 'android')) {
//             Alert.alert(errorMessage);
//         }
//     }


//     const onForgotPasswordPressed = () => {
//         console.warn("Forgotpassword Pressed");
//     }

//     const onSignUpPressed = () => {
//         router.push("/screens/Register")
//     }

//     return (
//         <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
//             <Stack.Screen
//                 options={{
//                     headerTitle: 'HeaderTitle',
//                     headerShown: false, //change if you want
//                 }}
//             />
//             <View style={styles.root}>
//                 <View style={[styles.box, errorMessage ? styles.boxWithErrorMessage : null]}>
//                     {/* <Image
//                         source={Logo}
//                         style={[styles.logo, { height: height * 0.3 }]}
//                         resizeMode="contain"
//                     /> */}
//                     <Text style={styles.loginText}>L O G I N</Text>
//                     <CustomInput
//                         style={styles.textFields}
//                         placeholder="Email"
//                         value={email}
//                         setValue={setEmail}
//                     />
//                     <CustomInput
//                         placeholder="Password"
//                         style={styles.textFields}
//                         value={password}
//                         setValue={setPassword}
//                     // secureTextEntry 
//                     />
//                     <CustomButton
//                         text="Sign In"
//                         onPress={onSignInPressed}
//                     />
//                     {/* <CustomButton
//                         text="Forgot Password"
//                         onPress={onForgotPasswordPressed}
//                         type="TERTIARY"
//                     /> */}
//                     <CustomButton
//                         text="Create Account"
//                         onPress={onSignUpPressed}
//                         type="TERTIARY"
//                     />

//                     {Platform.OS !== 'android' && Platform.OS !== 'ios' && errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
//                 </View>

//             </View>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     scrollView: {
//         flex: 1,
//         backgroundColor: '#000080',
//     },
//     root: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 200,
//         // backgroundColor: '#e0e1dd',
//         // paddingBottom: 130,
//         // paddingTop: 80,
//     },
//     box: {
//         backgroundColor: '#598392',
//         padding: 40,
//         width: 300,
//         height: 400,
//         borderRadius: 20,
//         alignContent: 'center',
//     },
//     boxWithErrorMessage: {
//         height: 450,
//     },
//     loginText: {

//         paddingLeft: 5,
//         fontSize: 22,

//         color: "white",
//         marginTop: 10,
//         marginBottom: 50,
//         paddingBottom: 5,
//         textAlign: 'center',

//     },
//     textFields: {
//         padding: 5,
//         color: '#757474',
//         outline: 'none',
//         borderWidth: 0,
//         borderRadius: 5,
//         height: 40
//     },
//     smallText: {

//     },
//     errorMessage: {
//         backgroundColor: 'red',
//         color: 'white',
//         paddingTop: '10px',
//         paddingBottom: '10px',
//         textAlign: 'center',
//         justifyContent: 'center'
//     }

// })

// export default Login