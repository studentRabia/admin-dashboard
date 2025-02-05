"use client";

import ProtectedRoute from "@/app/components/PortectedRoute";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Order } from "@/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
          _id,
          _createdAt,
          firstName,
          lastName,
          address,
          city,
          zipCode,
          phone,
          email,
          discount,
          subTotal,
          totalAmount,
          orderDate,
          status,
          cartItems[]{ title, image, quantity, price }
        }`
      )
      .then((data) => setOrders(data.map((order: Order) => ({ ...order, id: order._id }))))
      .catch((error) => console.log("Error Fetching Orders", error));
  }, []);
  

  const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderId)); // Changed from o.id to o._id
      Swal.fire("Deleted!", "Your order has been deleted.", "success");
    } catch (error) {
      console.error("Delete Error:", error); // Add logging to see the actual error
      Swal.fire("Error", "Failed to delete order.", "error");
    }
  };
  
  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)) // Changed from o.id to o._id
      );
  
      Swal.fire(
        newStatus === "Shipped" ? "Order Dispatched!" : "Order Updated!",
        `Your order has been marked as ${newStatus}.`,
        "success"
      );
    } catch (error) {
      console.error("Status Update Error:", error); // Add logging for debugging
      Swal.fire("Error", "Failed to change order status.", "error");
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-100">
        <nav className="bg-red-600 text-white p-4 shadow-lg flex justify-between">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="flex space-x-4">
            {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filter === status ? "bg-white text-red-600 font-bold" : "text-white"
                }`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-center">Orders</h2>
          <div className="overflow-y-auto bg-white rounded-lg shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                <React.Fragment key={order._id ?? ''}>
                <tr
                  className="cursor-pointer hover:bg-red-100 transition-all"
                  onClick={() => toggleOrderDetails(order._id ?? '')}
                >
                  <td>{order._id}</td>
                  <td>{order.firstName} {order.lastName}</td>
                  <td>{order.address}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>${order.subTotal}</td>
                  <td>
                    <select
                      title="select"
                      value={order.status || "Pending"}
                      onChange={(e) => handleStatusChange(order._id ?? '', e.target.value as Order["status"])}
                      className="bg-gray-100 p-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(order._id ?? '');
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              
                {selectedOrderId === (order._id ?? '') && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 p-4">
                      <h3 className="font-bold">Order Details</h3>
                      <p>Phone: <strong>{order.phone}</strong></p>
                      <p>Email: <strong>{order.email}</strong></p>
                      <p>City: <strong>{order.city}</strong></p>
                      <ul>
                        {order.cartItems.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            {item.title}
                            {item.image && item.image.asset && (
                              <Image
                                src={urlFor(item.image).url()}
                                alt={item.title}
                                width={100}
                                height={100}
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
