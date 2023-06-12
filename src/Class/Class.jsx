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
    <div>
      {classes.map((classItem) => (
        <div key={classItem.id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={classItem.image} alt={classItem.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{classItem.title}</h2>
            <p>{classItem.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Class;
