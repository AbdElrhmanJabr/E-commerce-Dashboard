import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col lg="4">
            <div className={styles.logo}>
              <h4 className="mt-2">Abd Elrhman</h4>
              <p className={`${styles.footer__text} mt-4`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ducimus aliquam placeat illo expedita hic unde error totam vel
                eligendi iste iusto, est at ipsa minima, laboriosam, impedit
                dolores? Nostrum, vitae.
              </p>
            </div>
          </Col>
          <Col lg="3">
            <div className={styles.quick__links}>
              <h4 className={`${styles.links__title} mt-2`}>Top Categories</h4>
              <ListGroup className="mb-3 mt-2">
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Smart Watch</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            <div className={styles.quick__links}>
              <h4 className={`${styles.links__title} mt-2`}>Use full Links</h4>
              <ListGroup className="mb-3 mt-2">
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"}>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className={styles.quick__links}>
              <h4 className={`${styles.links__title} mt-2`}>Contact</h4>
              <ListGroup className="mb-3 mt-2">
                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <span>Palestine Gaza</span>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <span>+972-59-487-8648</span>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <span>abdelrhmanjabr@amail.com</span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
