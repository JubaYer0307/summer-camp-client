import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";

import { FaTrashAlt } from "react-icons/fa";

const MyCart = () => {
  const [cart, refetch] = useCart();

  const total = cart.reduce((sum, item) => item.price + sum, 0);

    const handleDelete = item => {
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
             fetch(`http://localhost:5000/selectedClass/${item._id}`, {
                method: 'DELETE'
             })
             .then(res => res.json())
             .then(data => {
                if(data.deletedCount>0){
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
    }

  return (
    <div className="w-full">
      <div className="uppercase h-[65px] font-semibold flex justify-evenly items-center">
        <h2>Total item: {cart.length}</h2>
        <h2>Total Price: ${total}</h2>
        
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
                <td>
                  {item.name}
                </td>
                <td>{item.instructor}</td>
                <td>${item.price}</td>
                <td className="flex items-center gap-3">
                  <button onClick={()=> handleDelete(item)} className="btn btn-error btn-sm"><FaTrashAlt></FaTrashAlt></button>
                  <button className="btn btn-success btn-sm">PAY</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
