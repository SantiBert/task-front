import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TaskForm from "./pages/TaskForm ";
import Navbar from "./components/Navbar";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/task-create' element={<TaskForm/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;
