import React, { useRef } from "react";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase.config";
import { motion } from "framer-motion";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "dashboard/all-products",
  },
  {
    display: "Orders",
    path: "dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];
const AdminNav = () => {
  const { currentUser } = useAuth();
  const profileActionsRef = useRef(null);
  const navigate = useNavigate();

  const profileActionsToggle = () => {
    if (
      profileActionsRef.current?.classList.contains(
        `${styles.show__profile__actions}`
      )
    ) {
      profileActionsRef.current?.classList.replace(
        `${styles.show__profile__actions}`,
        `${styles.profile__actions}`
      );
    } else {
      profileActionsRef.current?.classList.replace(
        `${styles.profile__actions}`,
        `${styles.show__profile__actions}`
      );
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out Successfully");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* the nav bar */}
      <header className={styles.admin__header}>
        <div className={styles.admin__nav_top}>
          <Container>
            <div className={styles.admin__nav_wrapper_top}>
              <div className={styles.logo}>
                <h2>Abd Elrhman</h2>
              </div>

              <div className={styles.search}>
                <input type="text" placeholder="Search..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className={styles.admin__nav_top_right}>
                <span>
                  <i className="ri-notification-line"></i>
                </span>
                <span>
                  <i className="ri-settings-line"></i>
                </span>
                <div className={styles.profile}>
                  <motion.img
                    src={currentUser.photoURL}
                    alt="UserIcon"
                    whileTap={{ scale: 1.2 }}
                    onClick={profileActionsToggle}
                  />
                  <div
                    className={styles.profile__actions}
                    ref={profileActionsRef}
                    onClick={profileActionsToggle}
                  >
                    {currentUser ? (
                      <span onClick={logout}>LogOut</span>
                    ) : (
                      <div className={styles.signin__Sginout}>
                        <Link to={"/SignUp"}>SignUp</Link>
                        <Link to={"/Login"}>Login</Link>
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {/* The dashboard */}
      <section className={`${styles.admin__menu} p-0`}>
        <Container>
          <Row>
            <div className={styles.admin__navigation}>
              <ul className={styles.admin__menu_list}>
                {admin__nav.map((item, i) => {
                  return (
                    <li key={i} className={styles.admin__menu_item}>
                      <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) => {
                          return isActive ? styles.active__admin_menu : "";
                        }}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
