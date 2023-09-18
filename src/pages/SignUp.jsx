import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import styles from "../styles/LoginSignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { auth, db, storage } from "../firebase.config";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const refStorage = ref(storage, `images/${Date.now() + userName}`);
      const uploadTask = uploadBytesResumable(refStorage, file);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: userName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: userName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("Account Created");
      navigate("/Login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Some thing went wrong !!");
    }
  };
  return (
    <>
      <Helmet title="SignUp" />
      <section>
        <Container>
          <Row>
            {loading === true ? (
              <Col lg="12" className="text-center">
                <h6 className="fw-bold">Loading...</h6>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">SignUp</h3>
                <Form className={`${styles.auth__form}`} onSubmit={SignUp}>
                  <FormGroup className={`${styles.form__group}`}>
                    <input
                      type="text"
                      placeholder="Enter user name"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    ></input>
                  </FormGroup>

                  <FormGroup className={`${styles.form__group}`}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    ></input>
                  </FormGroup>

                  <FormGroup className={`${styles.form__group}`}>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    ></input>
                  </FormGroup>

                  <FormGroup className={`${styles.form__group}`}>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    ></input>
                  </FormGroup>

                  <button className={`${styles.buy__btn} ${styles.auth__btn}`}>
                    SignUp
                  </button>
                  <p>
                    Do you have an account ?
                    <Link to={"/Login"}>LogIn to your account</Link>
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

export default SignUp;
