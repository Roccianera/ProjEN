import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import Layout from "./Layout/Layout";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme.tsx";
import createStore from "react-auth-kit/createStore";
import  AuthProvider  from "react-auth-kit";

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
});

function App() {

  
  return (
    <>
      <AuthProvider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Layout>
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
