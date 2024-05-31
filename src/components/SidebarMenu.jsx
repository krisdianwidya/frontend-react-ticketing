const SidebarMenu = () => {
    return (
        <div className="h-screen bg-gray-800 fixed w-2">
            <span className="font-semibold text-2xl px-6 py-5 block text-400 w-full">Dashboard</span>
            <ul className="list-none p-0 m-0 overflow-hidden">
                <li>
                    <a className="flex align-items-center cursor-pointer px-6 py-3 text-400 hover:text-100 hover:bg-gray-600 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-chart-pie mr-2"></i>
                        <span className="font-medium">Overview</span>

                    </a>
                </li>
                <li>
                    <a className="flex align-items-center cursor-pointer px-6 py-3 text-400 hover:text-100 hover:bg-gray-600  transition-duration-150 transition-colors w-full">
                        <i className="pi pi-ticket mr-2"></i>
                        <span className="font-medium">Tickets</span>

                    </a>
                </li>
                <li>
                    <a className="flex align-items-center cursor-pointer px-6 py-3 text-400 hover:text-100 hover:bg-gray-600 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-lightbulb mr-2"></i>
                        <span className="font-medium">Ideas</span>

                    </a>
                </li>
                <li>
                    <a className="flex align-items-center cursor-pointer px-6 py-3 text-400 hover:text-100 hover:bg-gray-600 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-address-book mr-2"></i>
                        <span className="font-medium">Contacts</span>

                    </a>
                </li>
                <li>
                    <a className="flex align-items-center cursor-pointer px-6 py-3 text-400 hover:text-100 hover:bg-gray-600 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Agents</span>

                    </a>
                </li>
                <li>
                    <a className="flex align-items-center cursor-pointer px-6 py-3 text-400 hover:text-100 hover:bg-gray-600 transition-duration-150 transition-colors w-full">
                        <i className="pi pi-book mr-2"></i>
                        <span className="font-medium">Articles</span>

                    </a>
                </li>
            </ul>

        </div>
    )
}

export default SidebarMenu