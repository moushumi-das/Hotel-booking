import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { state, dispatch } = useContext(AuthContext);
  const { user,loading, error } = state;

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch(`/api/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const fetchData = await response.json();
    
if (fetchData?.status===200){ 
    console.log(fetchData)
    localStorage.setItem("token",fetchData?.token)
    dispatch({ type: "LOGIN_SUCCESS", payload: fetchData.data });
      navigate("/")}
   
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

console.log('user',user)
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login; 