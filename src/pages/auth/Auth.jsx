import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppContext";



const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {navigate} = useContext(AppContext)


    const loginHandler = async () => {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.user.role);
         navigate('/my-enrollments')
      } else {
        alert("Invalid login credentials");
      }
    };
  


  function loginSwitch(){
    setIsLogin(!isLogin)
  }

  return (
    <Container>
      <MainBox className="bg-primary-100">

        <SUpForm className="bg-primary-100">
          <Label onClick={loginSwitch} $isLogin={isLogin}>Sign Up</Label>
          <Input type="text" placeholder="Full Name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Input type="password" placeholder="Repeat Password" required />
          <Button>Sign Up</Button>
        </SUpForm>

        <LForm $isLogin={isLogin}>
        <Label2 onClick={loginSwitch} $isLogin={isLogin} className="text-primary-100">Login</Label2>
            <Input type="email" placeholder="Email" required  onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
            <Button2 className="bg-primary-100 hover:border-primary-100" onClick={loginHandler}>Login</Button2>
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
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
  overflow: hidden;
  margin: 0 auto;
`;

const SUpForm = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
	transform: ${(props) => (props.$isLogin ? 'translateY(130px)' : 'translateY(430px)')};
	transition: .8s ease-in-out;
`;


const Label = styled.label`
  color:#fff;
  font-size:${(props) => (props.$isLogin ? '1em' : '2em')};
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color:rgb(172, 170, 168);
    transform: scale(1.1);
  }
`;

const Label2 = styled.label`
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
  background:#fff;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #293240;
    border: 2px solid #1c222b;
    color: #e0dede;
  }
`;

const Button2 = styled.button`
  width: 70%;
  height: 40px;
  margin-top: 20px;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #fff;
    border: 2px solid #1c222b;
    color: #1c222b;
  }
`;

export default Auth;