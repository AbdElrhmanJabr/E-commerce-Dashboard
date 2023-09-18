import React, { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import styles from "../styles/AddProduct.module.css";
import toast from "react-hot-toast";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  // Add product to firebase
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = collection(db, "products");
      const storageRef = ref(
        storage,
        `productsImages/${Date.now() + productImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, productImg);
      uploadTask.on(
        () => {
          toast.error("Image not uploaded!!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              title,
              shortDesc,
              description,
              category,
              price,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Product Has been added successfully");
      navigate("/dashboard/all-products");
    } catch (error) {
      toast.error("Product not added!");
      setLoading(false);
    }
  };
  return (
    <>
      <section>
        <Container>
          <Row>
            {loading === true ? (
              <Col lg="12" className="text-center">
                <h6 className="fw-bold">Loading...</h6>
              </Col>
            ) : (
              <Col>
                <h4 className="mb-5">Add Product</h4>
                <Form>
                  <FormGroup className={styles.form__group}>
                    <span>Product Title</span>
                    <input
                      type="text"
                      placeholder="Double Sofa"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className={styles.form__group}>
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="Short Description..."
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className={styles.form__group}>
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className={`${styles.form__group} w-50`}>
                      <span>Price</span>
                      <input
                        type="text"
                        placeholder="100$"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className={`${styles.form__group} w-50`}>
                      <span>Category</span>
                      <select
                        className="w-100"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                        <option value="chair">Chair</option>
                      </select>
                    </FormGroup>
                  </div>
                  <FormGroup className={styles.form__group}>
                    <span>Product Image</span>
                    <input
                      type="file"
                      onChange={(e) => setProductImg(e.target.files[0])}
                      required
                    />
                  </FormGroup>

                  <button
                    type="submit"
                    className={styles.buy__btn}
                    onClick={addProduct}
                  >
                    Add The Product
                  </button>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddProducts;
