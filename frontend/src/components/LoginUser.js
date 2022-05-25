import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import login_bg from '../resources//images/login_bg.jpg';
import Navbar from './Navbar';
import "../styles/LoginUser.css";
import Axios from "axios"
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LoginUser = ({ setRole }) => {
    const baseUrl = "http://localhost:5000/authentication";
    const [email_signup, setemail_signup] = useState('');
    const [password_signup, setpassword_signup] = useState('');

    const [email_login, setemail_login] = useState('');
    const [password_login, setpassword_login] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const fromWhere = location.state?.fromWhere?.pathname || "/properties";

    const signup = () => {
        Axios.post(baseUrl + '/signup', { email: email_signup, password: password_signup })
            .then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                } else {
                    alert("Something went wrong... Please try later.");
                }
            });
    };

    const login = () => {
        Axios.post(baseUrl + "/login", { email: email_login, password: password_login })
            .then((response) => {
                if (response.data.message) {
                    alert(response.data.message);

                    // if (response.data.message === 'User has been logged in') {
                    //     setRole('Guest');
                    //     setTimeout(() => navigate(fromWhere, { replace: true }), 2000);
                    // }
                } else {
                    alert("Something went wrong... Please try later.");
                }
            });
    };

    return (
        <div>
            <div>
                <Navbar alternativeStyling={false} />
                <Body>
                    <BigContainer>
                        <Welcome>Welcome user.</Welcome>
                        <InputContainer>
                            <InputStyle type="text" placeholder='email' onChange={(event) => { setemail_login(event.target.value); }} />
                            <InputStyle type="password" placeholder='password' onChange={(event) => { setpassword_login(event.target.value); }} />
                        </InputContainer>
                        <ButtonContainer>
                            <button onClick={login} type="button" className="button">Login</button>
                        </ButtonContainer>
                        <br />
                        <br />
                        <TextStyle>
                            <Link to={"/ForgotPassword"}>Forgot password ?</Link>
                        </TextStyle>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <span>For the new agents:</span>
                        <br />
                        <InputContainer>
                            <InputStyle type="text" placeholder='email' onChange={(event) => { setemail_signup(event.target.value); }} />
                            <InputStyle type="password" placeholder='password' onChange={(event) => { setpassword_signup(event.target.value); }} />
                        </InputContainer>
                        <ButtonContainer>
                            <button onClick={signup} type="button" className="button">Signup</button>
                        </ButtonContainer>
                        <br />
                    </BigContainer>
                </Body>
            </div>
        </div>
    );
}

const InputContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: 5px;
    height: 20%;
    width: 100%;
    `;

const ButtonContainer = styled.div`
    margin: 1rem 0 2 rem 0;
    width: 100%;
    display : flex;
    align-items: center;
    justify-content: center;
    `;

const BigContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 95vh;
    width: 30vw;
    background: #f5f2f226;
    box-shadow: 0 8px 32px 0 #7788885e;
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    `;

const TextStyle = styled.h6`
    cursor: pointer;
    justify-content: center;
    
    `;

const Welcome = styled.h2`
    margin: 3rem 0 2rem 0;
    `;

const Separator = styled.hr`
    width: 95%;
    height : 0.rem;
    border-radius: 0.8rem;
    border: none;
    margin : 1.5em 0 1rem 0;
    background-color: #ffffff;
    backdrop-filter: blur(12px);
    `;

const Body = styled.div`
          font-family: 'Roboto';
          background: url(${login_bg});
          background-size:cover;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw
    `;

const InputStyle = styled.input`
    background: #ffffff85;
    box-shadow : 0 8px 32px 0 #4577765e;
    margin-bottom: 40px;
    border-radius : 2rem;
    width: 95%;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: #2a525d;
    font-size: 1rem;
    font-weight: bold;
    &:focus{
        display : inline-block;
        box-shadow: 0 0 0 0.2rem #c4c8c8;
        backdrop-filter: blur(12rem);
        border-radius: 2rem;
    }
    &::placeholder{
        color: white;
        font-weight: 100;
        font-size: 1rem;
    }
    `;

export default LoginUser;