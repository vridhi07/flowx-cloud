import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

function Dashboard() {
    const [activeIndex, setActiveIndex] = useState(0)
    const matches = useMediaQuery('(max-width:600px)');
    const handleActivePage = (index) => {
        setActiveIndex(index)
    }
    const handleSelectPage = (page) => {
        if (page == 'Workplace Wellness') {
            setActiveIndex(1)
        } else if (page == 'Personal Wellness') {
            setActiveIndex(2)
        } else {
            setActiveIndex(0)
        }


    }
    return (
        <div>Dashboard</div>
    )
}
export default Dashboard;