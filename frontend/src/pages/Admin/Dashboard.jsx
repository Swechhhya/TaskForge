import React from 'react';
import  { useUserAuth } from '../../hooks/useUserAuth';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

    return<DashboardLayout>DashBoard</DashboardLayout>
};

export default Dashboard

