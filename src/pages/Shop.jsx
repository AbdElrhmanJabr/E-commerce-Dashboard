import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import styles from "../styles/Shop.module.css";
import { Col, Container, Row } from "reactstrap";
import Products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import shopSection from "../assets/images/shop-section.jpg";

const Shop = () => {
  const [products, setProducts] = useState(Products);
  console.log(products);
  const filteredProductsHandler = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "Filter By Category") {
      setProducts(Products);
    } else {
      setProducts(Products.filter((item) => item.category === filterValue));
    }
  };

  const searchProductsHandler = (e) => {
    const filterValue = e.target.value.toLowerCase();
    if (filterValue === "") {
      setProducts(Products);
    } else {
      setProducts(
        Products.filter((item) => item.category.startsWith(filterValue))
      );
    }
  };
  const salaryProductsHandler = (e) => {
    const filterValue = e.target.value;
    console.log(filterValue);
    if (filterValue === "Sort By") {
      setProducts(Products);
    } else if (filterValue === "ascending") {
      setProducts(Products.toSorted((a, b) => a.price - b.price));
    } else {
      setProducts(Products.toSorted((a, b) => b.price - a.price));
    }
  };

  return (
    <>
      <Helmet title={"Shop"} />
      <section className={`${styles.image} pt-0`}>
        <img src={shopSection} alt="" />
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className={styles.filter__widget}>
                <select onChange={filteredProductsHandler}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                  <option value="chair">Chair</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="3">
              <div className={styles.filter__widget}>
                <select
                  className={styles.filter__widget}
                  onChange={salaryProductsHandler}
                >
                  <option>Sort By</option>
                  <option value="descending">Higher Price</option>
                  <option value="ascending">Low Price</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className={styles.search}>
                <input
                  onChange={searchProductsHandler}
                  type="text"
                  placeholder="Search About Products By The Category..."
                ></input>
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {products.length === 0 ? (
              <h1>No Products Found !!</h1>
            ) : (
              <ProductsList data={products} />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Shop;
