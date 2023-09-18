import React from "react";
import { Col, Container, Row } from "reactstrap";
import styles from "../styles/AllProducts.module.css";
import useGetData from "../hooks/useGetdata";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Deleted Successfully");
  };
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col>
              <table className={`${styles.table} table`}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading === true ? (
                    <h3 className="py-5  fw-bold">Loading....</h3>
                  ) : (
                    productsData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <img src={item.imgUrl} alt="/"></img>
                          </td>
                          <td>{item.title}</td>
                          <td>{item.category}</td>
                          <td>{item.price}$</td>
                          <td>
                            <button
                              className={`btn btn-danger`}
                              onClick={() => deleteProduct(item.id)}
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
    </>
  );
};

export default AllProducts;
