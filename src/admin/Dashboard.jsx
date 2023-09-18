import React from "react";
import { Col, Container, Row } from "reactstrap";
import styles from "../styles/Dashboard.module.css";
import useGetData from "../hooks/useGetdata";

const Dashboard = () => {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("users");

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="lg-3">
              <div className={`${styles.revenue__box}`}>
                <h5>Total Sales</h5>
                <span>$79873</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className={`${styles.order__box}`}>
                <h5>Orders</h5>
                <span>798</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className={`${styles.products__box}`}>
                <h5>Total Products</h5>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className={`${styles.users__box}`}>
                <h5>Total Users</h5>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
