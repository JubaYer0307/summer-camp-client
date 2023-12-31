import  { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const onSubmit = data => {
   
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photo)
          .then(() => {
            const saveUser = { name: data.name, email: data.email}

            fetch('https://photo-me-server.vercel.app/users', {
              method: 'POST',
              headers: {
                'content-type' : 'application/json'
              },
              body: JSON.stringify(saveUser)
            })
            .then(res => res.json())
            .then(data => {
              if(data.insertedId){

                reset();
                setRedirectToHome(true);
                
              }
            })
           
            
          })
          .catch(error => console.log(error));
      });
      
  };
  if (redirectToHome) {
    window.location.href = '/'; // Redirect to the home page
  }
 
    


  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text" {...register("name" ,  { required: true })} name="name"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && <span className="text-red-600">Name is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email" {...register("email", { required: true })} name="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && <span className="text-red-600">Email is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password" {...register("password" ,  { required: true })}  name="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && <span className="text-red-600">Password is required</span>}
              
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password" name="confirmPass" {...register("confirmPass")}

                placeholder="confirm password"
                className="input input-bordered"
              />
               
              
            </div>

            <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo" {...register("photo")}
                  placeholder="Photo URL"
                  className="input input-bordered" 
                />
              </div>
            <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Sign Up" />
            </div>
            <p><small>Already have an account? <Link to="/login">Please Login.</Link></small></p>
            <SocialLogin></SocialLogin>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default SignUp;
