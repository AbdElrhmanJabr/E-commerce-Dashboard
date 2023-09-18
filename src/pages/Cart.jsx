import React from "react";
import shopSection from "../assets/images/shop-section.jpg";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import styles from "../styles/Cart.module.css";
import { motion } from "framer-motion";
import { cartActions } from "../components/redux/slices/cart";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(cartActions.deleteItem({ id }));
    dispatch(cartActions.getTotalAmount());
  };

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <>
      <Helmet title={"Cart"} />
      {/* the hero section */}
      <section className={`${styles.image} pt-0`}>
        <img src={shopSection} alt="" />
      </section>

      {/* Cart Items */}
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems?.length === 0 ? (
                <h2 className="text-center fw-bold">
                  No Items Has Been Added !!
                </h2>
              ) : (
                <table className={`${styles.table} table bordered`}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.imgUrl}
                              alt={`${item.productName}`}
                            ></img>
                          </td>
                          <td>{item.productName}</td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <motion.i
                              onClick={() => deleteItem(item.id)}
                              whileTap={{ scale: 1.2 }}
                              className="ri-delete-bin-line"
                            ></motion.i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="fs-4 fw-bold">Subtotal</h6>
                <span className="fs-4 fw-bold">${totalAmount}</span>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button
                  className={`${styles.buy__btn} w-100 ${
                    cartItems.length === 0 ? styles.disabled : ""
                  } `}
                >
                  <Link
                    to={`${cartItems.length === 0 ? "" : "/Checkout"}`}
                    className={`w-100 d-block ${
                      cartItems.length === 0 ? styles.disabled : ""
                    } `}
                  >
                    Checkout
                  </Link>
                </button>
                <button className={`${styles.buy__btn} w-100 mt-3`}>
                  <Link to={"/shop"} className="w-100 d-block">
                    Continue Shopping
                  </Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;
