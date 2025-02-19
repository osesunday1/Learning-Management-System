import React, { useState } from "react";
import styled from "styled-components";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  function loginHandler(){
    setIsLogin(!isLogin)
  }

  return (
    <Container>
      <MainBox>
        <SUpForm >
          <Label onClick={loginHandler} isLogin={isLogin}>Sign Up</Label>
          <Input type="text" placeholder="Full Name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Input type="password" placeholder="Repeat Password" required />
          <Button>Sign Up</Button>
        </SUpForm>

        <LForm isLogin={isLogin}>
        <Label2 onClick={loginHandler} isLogin={isLogin}>Login</Label2>
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <Button2>Login</Button2>
        </LForm>

        
      </MainBox>
      </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: #fff;
`;

const MainBox = styled.div`
  position: relative;
  width: 350px;
  height: 500px;
  background:rgb(15, 55, 175);
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
  overflow: hidden;
  margin: 0 auto;
`;

const SUpForm = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(15, 55, 175);
  border-radius: 60% / 10%;
  transition: 0.8s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: -14px;
`;

const LForm = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
	height: 360px;
	background: #eee;
	border-radius: 20% / 20%;
	transform: ${(props) => (props.isLogin ? 'translateY(130px)' : 'translateY(430px)')};
	transition: .8s ease-in-out;
`;


const Label = styled.label`
  color:#fff;
  font-size:${(props) => (props.isLogin ? '1em' : '2em')};
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color:rgb(172, 170, 168);
    transform: scale(1.1);
  }
`;

const Label2 = styled.label`
  color:rgb(15, 55, 175);
  font-size: 2em;
  font-weight: bold;
  cursor: pointer;
  margin-top:-2em;
  margin-bottom: 1em;
  transition: 0.3s;
  &:hover {
    color:rgb(172, 170, 168);
    transform: scale(1.1);
  }
`;

const Input = styled.input`
  width: 70%;
  padding: 12px;
  margin: 5px 0;
  border: none;
  outline: none;
  border-radius: 5px;
  background: #e0dede;
`;

const Button = styled.button`
  width: 70%;
  height: 40px;
  margin-top: 20px;
  color: rgb(15, 55, 175);
  background:#fff;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: rgb(15, 55, 175);
    border: 2px solid #e0dede;
    color: #e0dede;
  }
`;

const Button2 = styled.button`
  width: 70%;
  height: 40px;
  margin-top: 20px;
  color: #fff;
  background:rgb(15, 55, 175);
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #fff;
    border: 2px solid rgb(15, 55, 175);
    color: rgb(15, 55, 175);
  }
`;

export default Auth;