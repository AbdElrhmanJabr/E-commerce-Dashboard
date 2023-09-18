import React from "react";
import shopSection from "../assets/images/shop-section.jpg";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import styles from "../styles/checkout.module.css";
import { useSelector } from "react-redux";
const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <>
      <Helmet title="Checkout" />
      {/* the hero section */}
      <section className={`${styles.image} pt-0`}>
        <img src={shopSection} alt="" />
      </section>
      {/* checkout section */}
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fs-4 fw-bold">Billing Information</h6>
              <Form>
                <FormGroup className={`${styles.form__group}`}>
                  <input type="text" placeholder="Enter your name"></input>
                </FormGroup>
                <FormGroup className={`${styles.form__group}`}>
                  <input type="email" placeholder="Enter your email"></input>
                </FormGroup>
                <FormGroup className={`${styles.form__group}`}>
                  <input type="number" placeholder="Phone number"></input>
                </FormGroup>
                <FormGroup className={`${styles.form__group}`}>
                  <input type="text" placeholder="Street Address"></input>
                </FormGroup>
                <FormGroup className={`${styles.form__group}`}>
                  <input type="text" placeholder="City"></input>
                </FormGroup>
                <FormGroup className={`${styles.form__group}`}>
                  <input type="text" placeholder="Postal code"></input>
                </FormGroup>
                <FormGroup className={`${styles.form__group}`}>
                  <input type="text" placeholder="Country"></input>
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className={`${styles.checkout__cart}`}>
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping <br />
                    free shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <button
                  className={`${styles.buy__btn} ${styles.auth__btn} w-100`}
                >
                  Place An Order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Checkout;
