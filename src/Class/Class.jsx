import  { useState, useEffect } from 'react';

const Class = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
              <button className="btn btn-primary">Select</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Class;
