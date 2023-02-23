import React from "react";
import styles from "./SideBar.module.css";
import { useDispatch } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { RiGroup2Fill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";

export default function SideBar({
  setTabIndex,
  index,
  gsidebarActive,
  gsetSidebarActive,
  fsidebarActive,
  fsetSidebarActive,
}) {
  const dispatch = useDispatch();

  const Logout = () => {
    localStorage.removeItem("converse_1910_logintoken");
    dispatch({
      type: "UPDATE_USER",
      payload: { username: "", email: "", loggedIn: false },
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.categories}>
        <button
          onClick={() => {
            setTabIndex(0);
            fsetSidebarActive(!fsidebarActive);
          }}
          className={styles.category}
        >
          <AiFillMessage color={index === 0 ? "salmon" : "#DDDDDD"} size={24} />
        </button>
        <button
          onClick={() => {
            setTabIndex(1);
            gsetSidebarActive(!gsidebarActive);
          }}
          className={styles.category}
        >
          <RiGroup2Fill size={28} color={index === 1 ? "salmon" : "#DDDDDD"} />
        </button>
        <button onClick={() => setTabIndex(2)} className={styles.category}>
          <FaAddressBook size={23} color={index === 2 ? "salmon" : "#DDDDDD"} />
        </button>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.category}
          onClick={() => {
            setTabIndex(3);
            fsetSidebarActive(!fsidebarActive);
          }}
        >
          <BsPersonCircle
            color={index === 3 ? "salmon" : "#DDDDDD"}
            size={24}
          />
        </button>

        <button className={styles.logout} onClick={Logout}>
          <RiLogoutCircleRLine size={22} color="#DDDDDD" />
        </button>
      </div>
    </div>
  );
}
