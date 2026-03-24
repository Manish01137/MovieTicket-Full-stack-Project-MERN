import { CircleDollarSignIcon, SquareBottomDashedScissors, UsersIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { dummyDashboardData } from '../../assets/assets';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [dashboardData,setDashboardData] = useState({
    totalBookings:0,
    totalRevenue:0,
    activeShows:[],
    totalUser:0
  });

  const [loading,setLoading] = useState(true);

  const dashboradCards = [
    {title:"Total Bookings",value: dashboardData.totalBookings || "0",icon:chartLineIcon},
    {title:"Total Revenue", value: dashboardData.totalRevenue || "0",icon:CircleDollarSignIcon},
    {title:"Active Shows",value:dashboardData.activeShows.length || "0", icon:UsersIcon},
    {title:"Total Users",value:dashboardData.totalUser || "0",icon: UserIcon}
  ]

  const fetchDashboardData = async () =>{
    setDashboardData(dummyDashboardData)
    setLoading(false)
  };

  useEffect(()=>{
    fetchDashboardData();
  },[]);
}

export default Dashboard
