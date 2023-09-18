import React, { useRef, useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import { Col, Container, Row } from "reactstrap";
import shopSection from "../assets/images/shop-section.jpg";
import styles from "../styles/productDetails.module.css";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../components/redux/slices/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams(); // the id you write it in the url ((:id)) and you destructure it here as you write it in the link
  const product = products.find((item) => item.id === id);
  const [tab, setTab] = useState("desc");
  const inputUser = useRef("");
  const inputMsg = useRef("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  // submit the review
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const reviewUserName = inputUser.current.value;
    const reviewUserMag = inputMsg.current.value;
    const UserReview = {
      reviewUserName,
      reviewUserMag,
      rating,
    };
    console.log(UserReview);
    toast.success("Review Submitted Successfully", {
      style: {
        color: "#0a1d37",
        fontSize: "18px",
        fontWeight: "bold",
      },
    });
  };

  // destructure the product
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
    totalPrice,
    quantity,
  } = product;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        productName,
        price,
        totalPrice,
        quantity,
        imgUrl,
      })
    );
  };

  // to view the product back when you choose one from the related
  useEffect(() => {
    window.scrollTo(0, 150);
  }, [product]);

  // get the related products
  const relatedProducts = products.filter((item) => item.category === category);
  return (
    <>
      <Helmet title={productName} />
      {/* the hero section */}
      <section className={`${styles.image} pt-0`}>
        <img src={shopSection} alt="" />
      </section>
      {/* the product section */}
      <section className="pt-0">
        <Container>
          <Row className="flex align-items-center">
            <Col lg="6">
              <img src={imgUrl} alt="/"></img>
            </Col>
            <Col lg="6">
              <div className={styles.product__details}>
                <h2>{productName}</h2>
                <div className={styles.product__rating}>
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                  </div>
                  <p>{avgRating}</p>
                </div>
                <span className={styles.price}>{price}$</span>
                <p className={styles.shortDesc}>{shortDesc}</p>
                <button className={styles.buy__btn} onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* the review and related products section */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className={styles.tap__warper}>
                <h6
                  onClick={() => setTab("desc")}
                  className={
                    tab === "desc" ? styles.active__tab : styles.tap__warper__h6
                  }
                >
                  Description
                </h6>
                <h6
                  onClick={() => setTab("rev")}
                  className={
                    tab === "rev" ? styles.active__tab : styles.tap__warper__h6
                  }
                >
                  Reviews({reviews.length})
                </h6>
              </div>
              <div className={styles.tap__content}>
                {tab === "desc" ? (
                  <p>{description}</p>
                ) : (
                  <div className={`${styles.product__wrapper} mt-5`}>
                    <div className={styles.review__wrapper}>
                      <ul>
                        {reviews.map((item, i) => {
                          return (
                            <li key={i} className="mb-4">
                              <h6>Jhon Doe</h6>
                              <span>{item.rating}(rating)</span>
                              <p>{item.text}</p>
                            </li>
                          );
                        })}
                      </ul>
                      <div className={styles.review__form}>
                        <h4>Leave Your Experience</h4>
                        <form action="" onSubmit={onSubmitHandler}>
                          <div className={styles.form__group}>
                            <input
                              type="text"
                              placeholder="Enter Name"
                              ref={inputUser}
                            />
                          </div>

                          <div className={styles.form__group}>
                            <span onClick={() => setRating(1)}>
                              1<i className="ri-star-s-fill"></i>
                            </span>
                            <span onClick={() => setRating(2)}>
                              2<i className="ri-star-s-fill"></i>
                            </span>
                            <span onClick={() => setRating(3)}>
                              3<i className="ri-star-s-fill"></i>
                            </span>
                            <span onClick={() => setRating(4)}>
                              4<i className="ri-star-s-fill"></i>
                            </span>
                            <span onClick={() => setRating(5)}>
                              5<i className="ri-star-s-fill"></i>
                            </span>
                          </div>

                          <div className={styles.form__group}>
                            <textarea
                              ref={inputMsg}
                              rows={4}
                              type="text"
                              placeholder="Review Message..."
                            />
                          </div>
                          <button className={styles.buy__btn}>Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col lg="12">
              <h2 className="mt-5 fw-semibold">You Might Like Also</h2>
            </Col>
            <ProductsList data={relatedProducts} className="mt-5" />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
