import "./Cart.css";
import CartItem from "../components/Cart/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Cart() {
    const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

//   const { loginInfo } = useLogin();

  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    // dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (item) => {
    // dispatch(removeFromCart({ pId: item.product, _id: item._id }));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleProceedBtn = () => {
  axios.post('http://localhost:5001/api/v1/auth/send-otp', {
    phoneNumber: 9058591443
  })
    alert("Functionality pending please stay tune, will be add soon.");
  };

//   if (loginInfo.loading) return <h1>Loading.....</h1>;
//   else if (!loginInfo.loading && loginInfo.isLogin)
    
    
    return (
        <>
          <div className="cartscreen">
            <div className="cartscreen__left">
              <h2>Shopping Cart</h2>
  
              {cartItems.length === 0 ? (
                <div>
                  Your Cart Is Empty <Link to="/">Go Back</Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.product}
                    item={item}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={() => removeFromCartHandler(item)}
                  />
                ))
              )}
            </div>
  
            <div className="cartscreen__right">
              <div className="cartscreen__info">
                <p>Subtotal ({getCartCount()}) items</p>
                <p>${getCartSubTotal()}</p>
              </div>
              <div>
                <button
                  title="Functionality need to be add."
                  onClick={handleProceedBtn}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      );
}