import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false); //Prevent multiple clicks

  const {navigate} = useContext(AppContext)

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Common validation function
  const validateForm = () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return false;
    }
    if (!isLogin && (!firstName || !lastName || password !== confirmPassword)) {
      toast.error("Please fill all fields correctly.");
      return false;
    }
    return true;
  };

    //Login Handler
  const loginHandler = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;


      setLoading(true);

      try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.user.role);
        localStorage.setItem("userID", data.data.user._id);
         
         if (data.data.user.role === "student"){
          navigate('/course-list')
         }
         if (data.data.user.role === "educator"){
          navigate('/educator')
         }
        }else {
          toast.error("Invalid login credentials.");
        }
      } catch (error) {
        toast.error("Login failed. Please try again.");
      }
      setLoading(false);
    };
 

// Function to handle file selection
const handleImageChange = (e) => {
  setProfileImage(e.target.files[0]);
};



// Signup Handler

  // 🔹 Signup Handler
  const signupHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);


    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordConfirm", confirmPassword);
      if (profileImage) {
        formData.append("photo", profileImage);
      }

      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.user.role);
        localStorage.setItem("userID", data.data.user._id);

        navigate("/course-list");
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch (error) {
      toast.error(error || "Signup failed. Please try again.");;
    }

    setLoading(false);
  };





  function loginSwitch(){
    setIsLogin(!isLogin)
  }

  return (
    <Container>
      <MainBox className="bg-secondary">

        <SUpForm className={`bg-secondary transition-all duration-500 ease-in-out transform ${
    isLogin ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
  }`} onSubmit={signupHandler}>
            <Label onClick={loginSwitch} $isLogin={isLogin}>Sign Up</Label>
            <Input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" placeholder="Repeat Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            <Button type="submit" disabled={loading} >{loading ? "Signing Up..." : "Sign Up"}</Button>
        </SUpForm>

        <LForm $isLogin={isLogin}>
        <Label2 onClick={loginSwitch} $isLogin={isLogin} className="text-secondary">Login</Label2>
            <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button2 className="bg-secondary hover:border-secondary" onClick={loginHandler}>Login</Button2>
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
  height: 600px;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
  overflow: hidden;
  margin: 0 auto;
`;

const SUpForm = styled.form`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8%;
`;

const LForm = styled.form`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
	height: 360px;
	background: #eee;
	border-radius: 20% / 20%;
	transform: ${(props) => (props.$isLogin ? 'translateY(130px)' : 'translateY(520px)')};
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