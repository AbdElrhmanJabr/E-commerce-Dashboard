import React from "react";
import styles from "../../styles/ProductCard.module.css";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cart";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        totalPrice: 0,
        quantity: 1,
        imgUrl: item.imgUrl,
      })
    );
  };
  const totalAmount = () => {
    dispatch(cartActions.getTotalAmount());
  };

  return (
    <>
      <Col lg="3" md="4">
        <div className={styles.product__item}>
          <div className={styles.product__img}>
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt={`${item.productName}`}
            />
          </div>
          <div className={styles.product__info}>
            <Link to={`/Shop/${item.id}`}>
              <h3 className={styles.product__title}>{item.productName}</h3>
            </Link>
            <span className="mt-2 d-block fw-semibold">{item.category}</span>
          </div>
          <div className={styles.product__card__bottom}>
            <span className={styles.price}>{item.price}$</span>
            <span
              onClick={() => {
                addItem();
                totalAmount();
              }}
            >
              <i className="ri-shopping-cart-line"></i>
            </span>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductCard;
