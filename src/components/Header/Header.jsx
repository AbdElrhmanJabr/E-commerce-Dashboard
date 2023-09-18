import React, { useRef, useState } from "react";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import UserIcon from "../../assets/images/user-icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity); //get the quantity of products in the cart
  const [sticky, setSticky] = useState(false); // to handle the position of the navbar
  const { currentUser } = useAuth();
  const profileActionsRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 32) {
      setSticky(true);
      profileActionsRef.current?.classList.replace(
        `${styles.show__profile__actions}`,
        `${styles.profile__actions}`
      );
    } else {
      setSticky(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

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
      window.scrollTo(0, 0);
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
      <header
        className={`${styles.header} ${sticky === true ? styles.sticky : ""}`}
      >
        <Container>
          <Row>
            <div className={styles.nav_wrapper}>
              <div className={styles.logo}>
                <img src={logo} alt="logo"></img>
                <h1>Abd Elrhman</h1>
                <p>since 2023</p>
              </div>
              <div className={styles.navigation}>
                <div className={styles.menu}>
                  <NavLink
                    to={"Home"}
                    className={({ isActive }) =>
                      isActive ? styles.nav__active : styles.nav__item
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"Shop"}
                    className={({ isActive }) =>
                      isActive ? styles.nav__active : styles.nav__item
                    }
                  >
                    Shop
                  </NavLink>
                  <NavLink
                    to={"Cart"}
                    className={({ isActive }) =>
                      isActive ? styles.nav__active : styles.nav__item
                    }
                  >
                    Cart
                  </NavLink>
                </div>
              </div>
              <div className={styles.nav__icons}>
                <span className={styles.fav__icon}>
                  <i className="ri-heart-line"></i>
                  <span className={styles.badge}>1</span>
                </span>
                <motion.span
                  whileTap={{ scale: 1.2 }}
                  className={styles.cart__icon}
                  onClick={() => navigate("/cart")}
                >
                  <i className="ri-shopping-bag-line"></i>
                  <span className={styles.badge}>{totalQuantity}</span>
                </motion.span>
                <div className={styles.profile}>
                  <motion.img
                    src={currentUser ? currentUser.photoURL : UserIcon}
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
                      <div>
                        <span onClick={logout}>LogOut</span>
                      </div>
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
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
