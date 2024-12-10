import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useSelector } from "react-redux"

import { sidebarLinks } from "../../../data/dashboardLinks";
import LogoutConfirmationModal from "../../common/LogoutConfirmationModal"
import SidebarLink from "./SidebarLink";
import { HiOutlineLogout } from "react-icons/hi";

export default function Sidebar() {
  const { user } = useSelector((state) => state.profile)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(false)

  return (
    <>
      <div className="flex h-100vh min-w-[220px] flex-col border-r-[1px] py-10 ml-[-5px]">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user.ac_type !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12" />
        <div className="flex flex-col">
          {user.ac_type==="normal_user" && <SidebarLink
            link={{ name: "Settings", path: "/dashboard/user-settings" }}
            iconName="IoSettingsOutline"
          />}
          {user.ac_type==="admin" && <SidebarLink
            link={{ name: "Settings", path: "/dashboard/admin-settings" }}
            iconName="IoSettingsOutline"
          />}
          <button
            onClick={() =>setConfirmationModal(true)}
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <div className="text-xl"><HiOutlineLogout /></div>
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <LogoutConfirmationModal confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} />}
    </>
  )
}