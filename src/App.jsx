import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./features/authentication/Login";
import Homepage from "./Homepage";
import Register from "./features/authentication/Register";
import { userLogin, login, logout } from "./features/user/userSlice";
import { auth } from "./features/configuration/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [cookie, , ] = useCookies(["token", "role"]);
  const user = useSelector(userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
