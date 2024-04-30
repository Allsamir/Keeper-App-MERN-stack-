import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isPasswordVisiable, setPasswordVisiable] = useState(false);
  const onSubmit = (data, event) => {
    const { email, password } = data;
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    if (isValidPassword) {
      login(email, password)
        .then(() => {
          Swal.fire({
            title: "Successfully Login",
            icon: "success",
            confirmButtonText: "Close",
          });
          event.target.reset();
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: "Error!",
            text: `${errorCode} ${errorMessage}`,
            icon: "error",
            confirmButtonText: "Close",
          });
        });
    } else {
      Swal.fire({
        title: "Password Validation",
        text: `Must have an Uppercase letter in the password, 
              Must have a Lowercase letter in the password,
              Length must be at least 6 character
              `,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const handleTogglePasswordVisibility = () =>
    setPasswordVisiable(!isPasswordVisiable);

  return (
    <div
      className="hero min-h-screen bg-[#eee]"
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/brushed-alum-dark.png")',
      }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold font-pop">Login now!</h1>
          <p className="py-6 font-pop">
            Keeper App keeps your note safe and secret
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisiable ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-1 bg-transparent"
                  onClick={handleTogglePasswordVisibility}
                >
                  {isPasswordVisiable ? "🙈" : "👁️"}
                </button>
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value={`Login`}
              />
            </div>
            <p className="text-center py-2">
              Don&apos;t have any account?{" "}
              <Link className="text-blue-600" to={`/register`}>
                Register
              </Link>{" "}
              here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
