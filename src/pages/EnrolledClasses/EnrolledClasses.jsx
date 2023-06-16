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
        const filteredPayments = data.filter(
          (payment) => payment.email === user.email
        );

        // Sort payments by date in descending order (newest on top)
        const sortedPayments = filteredPayments.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setPayments(sortedPayments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [axiosSecure, user]);

  return (
    <div>
      <h1 className="mb-5 text-blue-700 font-bold text-xl">Enrolled Classes:</h1>
      {payments.map((payment, index) => (
        <div className="flex gap-5 mb-5" key={payment._id}>
          <p className="font-bold"> {index + 1}. </p>
          <div>
            <p>Class Name: {payment.itemNames}</p>
            <p>Paid: {payment.price}</p>
          </div>
          {/* Display other payment details as needed */}
        </div>
      ))}
    </div>
  );
};

export default EnrolledClasses;
