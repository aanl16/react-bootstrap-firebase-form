import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./Components/RegisterPage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyB64OKcLvGG3wvWRu8W4DXECkofxxzWKf0",
  authDomain: "react-bootstrap-form.firebaseapp.com",
  projectId: "react-bootstrap-form",
  storageBucket: "react-bootstrap-form.appspot.com",
  messagingSenderId: "296647221972",
  appId: "1:296647221972:web:a178651a1e491f50b51141",
  measurementId: "G-HNVE3H9X9H",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
