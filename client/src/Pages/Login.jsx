import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login, loading, setLoading } = useAuth();
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
          }).then(() => {
            event.target.reset();
            navigate("/home");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: "Error!",
            text: `${errorCode} ${errorMessage}`,
            icon: "error",
            confirmButtonText: "Close",
          }).then(() => setLoading(false));
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
      {loading && (
        <div className="min-h-screen text-center flex flex-col justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="text-center lg:text-left font-pop text-black">
          <h1 className="text-3xl md:text-5xl font-bold font-pop">
            Login now!
          </h1>
          <p className="py-6 font-pop">
            Keeper App keeps your note safe and secure
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg[#eee] text-black font-pop">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-[#eee]"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisiable ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered bg-[#eee] w-full"
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
                <Link
                  to={`/reset-password`}
                  href="#"
                  className="label-text-alt link link-hover text-black"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-outline text-black"
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
