
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';

import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';

import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
   
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
          
          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<dashboard />}/>
          <Route path="/admin/manage-tasks" element={<ManageTasks />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<UserDashboard />}/>
          <Route path="/user/my-tasks" element={<MyTasks />} />
          <Route path="/user/task-details/:taskId" element={<ViewTaskDetails />} />
         </Route>
          {/* Add more routes as needed */}
        </Routes>
      </Router>
  
  )
}

export default App

