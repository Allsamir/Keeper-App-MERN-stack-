import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import useAxios from "../Hooks/useAxios";

const Form = ({ handleFetchNotes }) => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxios();
  const [littleFunc, setLittleFunc] = useState(false);
  const { user, loading, setLoading } = useContext(AuthContext);
  const onSubmit = (data, event) => {
    const { title, note } = data;
    setLoading(true);
    axiosSecure
      .post("/notes", {
        title: title,
        note: note,
        email: user.email,
      })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          Swal.fire({
            title: "Note Saved",
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            event.target.reset();
            handleFetchNotes();
          });
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      {loading && (
        <div className="text-center flex flex-col justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="text-center my-12 w-72 sm:w-80 md:w-96 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-pop flex flex-col bg-[#fff] text-black p-4 shadow-2xl rounded-lg relative"
        >
          <input
            type="text"
            placeholder="Title"
            className="bg-[#fff] text-black mb-4 border-none outline-none"
            {...register("title")}
            required
            onClick={() => setLittleFunc(true)}
          />
          <textarea
            placeholder="Take a note..."
            id=""
            cols="4"
            rows="4"
            className={`bg-[#fff] text-black border-none outline-none resize-none ${
              littleFunc ? "block" : "hidden"
            }`}
            style={{ transition: "transform 0.3s ease-in-out" }}
            {...register("note")}
            required
          ></textarea>
          <button
            className={`absolute right-4 top-[150px] ${
              littleFunc ? "block" : "hidden"
            }`}
            type="submit"
          >
            <IoMdAddCircle className="text-4xl" />
          </button>
        </form>
      </div>
    </>
  );
};

Form.propTypes = {
  handleFetchNotes: PropTypes.func.isRequired,
};

export default Form;
