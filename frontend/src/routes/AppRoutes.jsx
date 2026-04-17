import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ShopkeeperDashboard from '../pages/ShopkeeperDashboard';
import CustomerDashboard from '../pages/CustomerDashboard';
import AddProductPage from '../pages/AddProductPage';
import ProductListPage from '../pages/ProductListPage';
import CartPage from '../pages/CartPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import BillPage from '../pages/BillPage';
import AdminDashboard from '../pages/AdminDashboard';
import CreateBillPage from '../pages/CreateBillPage';
import ViewBillPage from '../pages/ViewBillPage';
import OrdersPage from '../pages/OrdersPage';
import PaymentSuccessPage from '../pages/PaymentSuccessPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Shopkeeper routes */}
      <Route path="/shopkeeper/dashboard" element={
        <PrivateRoute role="shopkeeper">
          <ShopkeeperDashboard />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/orders" element={
        <PrivateRoute role="shopkeeper">
          <OrdersPage />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/products" element={
        <PrivateRoute role="shopkeeper">
          <ProductListPage />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/add-product" element={
        <PrivateRoute role="shopkeeper">
          <AddProductPage />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/edit-product/:id" element={
        <PrivateRoute role="shopkeeper">
          <AddProductPage />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/admin" element={
        <PrivateRoute role="shopkeeper">
          <AdminDashboard />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/create-bill" element={
        <PrivateRoute role="shopkeeper">
          <CreateBillPage />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/bill/:orderId" element={
        <PrivateRoute role="shopkeeper">
          <BillPage />
        </PrivateRoute>
      } />
      <Route path="/shopkeeper/view-bill/:billId" element={
        <PrivateRoute role="shopkeeper">
          <ViewBillPage />
        </PrivateRoute>
      } />
      
      {/* Customer routes */}
      <Route path="/customer/dashboard" element={
        <PrivateRoute role="customer">
          <CustomerDashboard />
        </PrivateRoute>
      } />
      <Route path="/customer/products" element={
        <PrivateRoute role="customer">
          <ProductListPage />
        </PrivateRoute>
      } />
      <Route path="/customer/cart" element={
        <PrivateRoute role="customer">
          <CartPage />
        </PrivateRoute>
      } />
      <Route path="/customer/orders" element={
        <PrivateRoute role="customer">
          <OrderHistoryPage />
        </PrivateRoute>
      } />
      <Route path="/customer/payment-success" element={
        <PrivateRoute role="customer">
          <PaymentSuccessPage />
        </PrivateRoute>
      } />
      <Route path="/customer/bill/:orderId" element={
        <PrivateRoute role="customer">
          <BillPage />
        </PrivateRoute>
      } />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;