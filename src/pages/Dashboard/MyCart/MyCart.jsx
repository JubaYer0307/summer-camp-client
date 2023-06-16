import Swal from "sweetalert2";
import { useState } from "react";

import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);

const MyCart = () => {
  const [cart, refetch] = useCart();
  const [selectedClass, setSelectedClass] = useState(null);
  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://photo-me-server.vercel.app/selectedClass/${item._id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
      }
    })
  };

  const handlePay = (item) => {
    setSelectedClass(item);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Class</th>
              <th>Instructor Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.instructor}</td>
                <td>${item.price}</td>
                <td className="flex items-center gap-3">
                  <button onClick={() => handleDelete(item)} className="btn btn-error btn-sm">
                    <FaTrashAlt />
                  </button>
                  <button onClick={() => handlePay(item)} className="btn btn-success btn-sm">PAY</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-blue-500">
        {selectedClass && (
          <Elements stripe={stripePromise}>
            <CheckoutForm cart={[selectedClass]} price={selectedClass.price} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default MyCart;
