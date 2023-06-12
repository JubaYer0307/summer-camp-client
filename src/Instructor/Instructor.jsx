import  { useState, useEffect } from 'react';
import axios from 'axios';

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/instructors');
        setInstructors(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {instructors.map((instructor) => (
        <div key={instructor.id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={instructor.image} alt={instructor.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{instructor.name}</h2>
            <p>{instructor.email}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Instructor;
