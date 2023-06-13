import  { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Class = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const{user} = useContext(AuthContext);

  const [, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();


  const handleSelectedClass = classItem => {
    console.log(classItem);
    if(user && user.email) {
      const selectedItem = {classId: classItem.id, name:classItem.name, image: classItem.image, price: classItem.price, email: user.email, instructor:classItem.instructor}
      fetch('http://localhost:5000/selectedClass',{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(selectedItem)
      })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId){
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          Swal.fire({
            title: 'Please Login?',
            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login!'
          }).then((result) => {
            if (result.isConfirmed) {
             navigate('/login', {state: {from: location}})
            }
          })
        }
      })
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {classes.map((classItem) => (
        <div key={classItem.id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={classItem.image} alt={classItem.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{classItem.name}</h2>
            <p>Instructor: {classItem.instructor}</p>
            <p>Available Seat: {classItem.availableSeats}</p>
            <p>Price: ${classItem.price}</p>
            <div className="card-actions justify-end">
              <button onClick={() => handleSelectedClass(classItem)} className="btn btn-primary">Select</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Class;
