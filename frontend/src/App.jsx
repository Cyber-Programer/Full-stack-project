import LoginForm from "./pages/LoginForm";
import "./styles/main.css";
import SignupForm from "./pages/SignupForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import AddNewTask from "./features/AddNewTask";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/newTask" element={<AddNewTask/>}/>
      </Routes>
    </Router>
  );
}

export default App;