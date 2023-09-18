import React from "react";
import styles from "./services.module.css";
import { Col, Container, Row } from "reactstrap";
import serviceData from "../../assets/data/serviceData";

const Services = () => {
  return (
    <>
      <section className={styles.services__section}>
        <Container>
          <Row>
            {serviceData.map((item, i) => {
              return (
                <Col lg="3" md="3" key={i}>
                  <div
                    className={styles.services__item}
                    style={{ background: `${item.bg}` }}
                  >
                    <span>
                      <i className={`${item.icon}`}></i>
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Services;
