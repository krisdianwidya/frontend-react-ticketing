
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';

const TopMenu = () => {
    const [pageName, setPageName] = useState("")

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            setPageName("Overview")
        } else if (location.pathname === '/tickets') {
            setPageName("Tickets")
        }
    }, [location.pathname]);

    return (
        <div className="flex justify-content-between mt-4 text-700">
            <span className="font-semibold text-2xl">{pageName}</span>

            <div className="flex align-items-center">
                <i className="pi pi-search mr-5"></i>
                <i className="pi pi-bell mr-5"></i>
                <div className="flex align-items-center border-left-2">
                    <span className="font-semibold block mx-5">jane Doe</span>
                    <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                </div>
            </div>
        </div>
    )
}

export default TopMenu