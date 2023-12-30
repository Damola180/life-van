import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Van/Vans";
import VansDetail from "./pages/Van/VanDetail";
import "./index.css";
// import "./server";
import Layout from "./components/Layout";
import Reviews from "./pages/Host/Reviews";
import Income from "./pages/Host/Income";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp-pg";
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import HostVans from "./pages/Host/HostVans";
import AuthRequired from "./components/AuthRequired";
import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing";
import NotFound from "./pages/NotFound";
import AuthContextProvider from "./components/AuthContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VansDetail />} />

            <Route element={<AuthRequired />}>
              <Route path="host" end element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />

                <Route path="vans" element={<HostVans />} />

                <Route path="vans/:id" element={<HostVanDetail />}>
                  <Route index element={<HostVanInfo />} />
                  <Route path="photos" element={<HostVanPhotos />} />
                  <Route path="pricing" element={<HostVanPricing />} />
                </Route>

                <Route path="reviews" element={<Reviews />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
