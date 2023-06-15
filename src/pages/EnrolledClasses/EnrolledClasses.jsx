import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const EnrolledClasses = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [axiosSecure] = useAxiosSecure();

 useEffect(() => {
  const fetchPayments = async () => {
    try {
      const response = await axiosSecure.get(`/save-payment`);
      const data = response.data;
      
      // Filter payments based on user email
      const filteredPayments = data.filter(payment => payment.email === user.email);
      
      setPayments(filteredPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  fetchPayments();
}, [axiosSecure, user]);


  return (
    <div>
      <h1>Enrolled Classes</h1>
      {payments.map((payment) => (
        <div key={payment._id}>
          <p>Transaction ID: {payment.transactionId}</p>
          <p>Price: {payment.price}</p>
          {/* Display other payment details as needed */}
        </div>
      ))}
    </div>
  );
};

export default EnrolledClasses;
