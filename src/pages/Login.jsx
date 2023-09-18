import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import styles from "../styles/LoginSignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Successfully Logged In !!");
      navigate("/Checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Helmet title="Login" />
      <section>
        <Container>
          <Row>
            {loading === true ? (
              <Col lg="12" className="text-center">
                <h6 className="fw-bold">Loading...</h6>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className={`${styles.auth__form}`} onSubmit={Login}>
                  <FormGroup className={`${styles.form__group}`}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </FormGroup>
                  <FormGroup className={`${styles.form__group}`}>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </FormGroup>
                  <button className={`${styles.buy__btn} ${styles.auth__btn}`}>
                    Login
                  </button>
                  <p>
                    Don't have an account ?
                    <Link to={"/SignUp"}>Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
