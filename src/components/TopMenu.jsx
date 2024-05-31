
import React from 'react';
import { Avatar } from 'primereact/avatar';

const TopMenu = () => {

    return (
        <div className="flex justify-content-between mt-4 text-700">
            <span className="font-semibold text-2xl">Overview</span>

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