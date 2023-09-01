import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Home from "./pages/homePage/Home.jsx";
import Login from "./pages/loginPage/Login.jsx";
import Profile from "./pages/profilePage/Profile.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(()=>{
    return createTheme(themeSettings(mode));
  }, [mode]);
  const isAuth = useSelector((state) => state.token);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={ isAuth ? <Home /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={ isAuth ? <Profile /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
