import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import styles from "../styles/Home.module.css";
import hero from "../assets/images/hero-img.png";
import { Link } from "react-router-dom";
import Services from "../components/Services/Services";
import ProductsList from "../components/UI/ProductsList";
import Products from "../assets/data/products";
import clockImg from "../assets/images/counter-timer-img.png";
import Clock from "../components/UI/Clock";
import { motion } from "framer-motion";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSales, setBestSales] = useState([]);
  const [mobiles, setMobile] = useState([]);
  const [wireless, setWireless] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const filteredTrendingProducts = Products.filter(
      (item) => item.category === "chair"
    );
    setTrendingProducts(filteredTrendingProducts);

    const filteredBestSales = Products.filter(
      (item) => item.category === "sofa"
    );
    setBestSales(filteredBestSales);

    const filteredMobiles = Products.filter(
      (item) => item.category === "mobile"
    );
    setMobile(filteredMobiles);

    const filteredWireless = Products.filter(
      (item) => item.category === "wireless"
    );
    setWireless(filteredWireless);

    const filteredPopular = Products.filter(
      (item) => item.category === "watch"
    );
    setPopular(filteredPopular);
  }, []);

  const year = new Date().getFullYear();
  return (
    <>
      <Helmet title={"Home"} />

      {/*Hero Section  */}
      <section className={styles.hero__section}>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className={styles.hero_content}>
                <p className={styles.hero_subtitle}>
                  Trending Product In {year}
                </p>
                <h2>Make Your Interior More Minimalistic & Modern </h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
                  illum praesentium ratione facilis quod vero mollitia dolore
                  aspernatur, minus fugiat illo sapiente molestias consequatur
                  tempora hic veritatis temporibus dolor esse!
                </p>
                <button className={styles.buy__btn}>
                  <Link to={"Shop"}>SHOP NOW</Link>
                </button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className={styles.hero_img}>
                <img src={hero} alt="hero"></img>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*Services Section  */}
      <Services />

      {/* Trending Products */}
      <section className={styles.trending__products}>
        <Container className="mb-4">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title  mb-4 fs-1 font-bold">
                Trending Products
              </h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      {/* Best Sales */}
      <section className={styles.best__sales}>
        <Container className="mb-4">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title  mb-4 fs-1 font-bold">
                Best Sales
              </h2>
            </Col>
            <ProductsList data={bestSales} />
          </Row>
        </Container>
      </section>

      {/* Clock */}
      <section className={styles.time__counter}>
        <Container>
          <Row className="flex align-items-center mb-4">
            <Col lg="6" md="6">
              <div>
                <h2 className="text-white fs-6 mb-2">Limited Offers</h2>
                <p className="text-white fs-5 mb-3">Quality Armchair</p>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className={`${styles.buy__btn} ${styles.clock__btn}`}
              >
                <Link to={"/shop"}>Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end">
              <img src={clockImg} alt="/" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* new Arrivals */}
      <section className={styles.new__arrivals}>
        <Container className="mb-4">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-4 fs-1 font-bold">
                New Arrivals
              </h2>
            </Col>
            <ProductsList data={mobiles} />
            <ProductsList data={wireless} />
          </Row>
        </Container>
      </section>

      {/* Popular */}
      <section className={styles.popular}>
        <Container className="mb-4">
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title  mb-4 fs-1 font-bold">Popular</h2>
            </Col>
            <ProductsList data={popular} />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
