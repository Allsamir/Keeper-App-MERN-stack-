import { useForm } from "react-hook-form";
import { auth } from "../config/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PasswordReset = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data, event) => {
    const { email } = data;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Successfully Link Sent",
          icon: "success",
          confirmButtonText: "Close",
        });
        event.target.reset();
        navigate("/");
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
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h1 className="my-4 text-black">
          We will sent a password reset link to your email
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="form-control mt-6">
            <input
              className="btn btn-outline text-black"
              type="submit"
              value={`Send Link`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
