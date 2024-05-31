import SidebarMenu from "../components/SidebarMenu"
import TopMenu from "../components/TopMenu"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <div className="grid">
            <div className="col-2 p-0">
                <SidebarMenu />
            </div>
            <div className="col-10 px-3">
                <TopMenu />
                <Outlet />
            </div>
        </div>
    )
}