import React from "react";
import { Col, Container, Row } from "reactstrap";
import useGetData from "../hooks/useGetdata";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase.config";
import styles from "../styles/AllProducts.module.css";

const Users = () => {
  const { data: usersData, loading } = useGetData("users");
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted Successfully");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className={`${styles.table} table`}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading === true ? (
                  <h3 className="pt-5 fw-cold">Loading....</h3>
                ) : (
                  usersData?.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <img src={user.photoURL} alt="/" />
                        </td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className={`btn btn-danger`}
                            onClick={() => deleteProduct(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
