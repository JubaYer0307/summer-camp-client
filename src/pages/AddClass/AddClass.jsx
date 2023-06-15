import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
    const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const loggedInInstructor = {
    name: user.name, 
    email: user.email, 
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    fetch(img_hosting_url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const image = imgResponse.data.display_url;
          const { name, price, availableSeats } = data;
          const newItem = {
            name,
            image,
            instructorName: loggedInInstructor.name,
            instructorEmail: loggedInInstructor.email,
            availableSeats: parseInt(availableSeats),
            price: parseFloat(price),
            status: 'pending',
          };
          console.log(newItem);
          axiosSecure
            .post('/classes', newItem)
            .then((data) => {
              console.log('after posting new class item', data.data);
              if (data.data.insertedId) {
                reset();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Class added successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };

  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register('name', { required: true, maxLength: 120 })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Image*</span>
          </label>
          <input
            type="file"
            {...register('image', { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Instructor Name</span>
          </label>
          <input
            type="text"
            readOnly
            value={loggedInInstructor.name}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Instructor Email</span>
          </label>
          <input
            type="email"
            readOnly
            value={loggedInInstructor.email}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex my-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Available Seats*</span>
            </label>
            <input
              type="number"
              {...register('availableSeats', { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register('price', { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <input className="btn btn-sm mt-4" type="submit" value="Add Class" />
      </form>
    </div>
  );
};

export default AddClass;
