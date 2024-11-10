import { jwtDecode } from "jwt-decode";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ToastContainer, toast } from "react-toastify";

import NavBar from "./components/Navbar/NavBar";
import Routing from "./components/Routing/Routing";
import { useCallback, useEffect, useState } from "react";
import { getJWT, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  getCartAPI,
  increaseProductAPI,
  decreaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import "./App.css";
setAuthToken(getJWT());

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);
  const addTocart = useCallback(
    (product, quantity) => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id
      );
      if (productIndex === -1) {
        updatedCart.push({ product: product, quantity: quantity });
      } else {
        updatedCart[productIndex].quantity += quantity;
      }
      setCart(updatedCart);
      addToCartAPI(product._id, quantity)
        .then((res) => {
          toast.success("Product Added Succefully!");
        })
        .catch((err) => {
          toast.error("Failed to add product");
          setCart(cart);
        });
    },
    [cart]
  );
  const removeFromCart = useCallback(
    (id) => {
      const oldCart = [...cart];
      const newCart = oldCart.filter((item) => item.product._id !== id);
      setCart(newCart);
      removeFromCartAPI(id).catch((err) => {
        toast.error("Chin Tapak dum Dum!~");
        setCart(oldCart);
      });
    },
    [cart]
  );
  const updateCart =useCallback
    ((type, id) => {
      const oldCart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
        increaseProductAPI(id).catch((err) => {
          toast.error("chin tapak dumd dum");
          setCart(oldCart);
        });
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        decreaseProductAPI(id).catch((err) => {
          toast.error("chin tapak dumd dum");
          setCart(oldCart);
        });
      }
    },
    [cart]);
  const getCart =useCallback
    (() => {
      getCartAPI()
        .then((res) => {
          setCart(res.data);
        })
        .catch((err) => {
          toast.error("Chin Tapak Dam Dam!~");
        });
    },
    [user]);
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addTocart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <NavBar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
