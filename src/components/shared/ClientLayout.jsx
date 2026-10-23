"use client";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Bounce, ToastContainer } from "react-toastify";
import { ExerciseProvider } from "@/context/Exercise";

const ClientLayout = ({ children }) => {
  return (
    <div>
      <ExerciseProvider>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </ExerciseProvider>
    </div>
  );
};

export default ClientLayout;
