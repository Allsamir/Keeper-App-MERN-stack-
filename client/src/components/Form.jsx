import { useContext } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";
import { AuthContext } from "../Provider/AuthProvider";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const onSubmit = (data, event) => {};
  return (
    <div className="text-center my-12 w-80 md:w-96 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-pop flex flex-col bg-[#fff] text-black p-4 shadow-2xl rounded-lg relative"
      >
        <input
          type="text"
          placeholder="Title"
          className="bg-[#fff] text-black mb-4 border-none outline-none"
          {...register("title")}
        />
        <textarea
          placeholder="Take a note..."
          id=""
          cols="4"
          rows="4"
          className="bg-[#fff] text-black border-none outline-none resize-none"
          {...register("body")}
        ></textarea>
        <button className="absolute right-4 top-[120px]">
          <input className="text-black" type="submit" value={``} />
          <IoMdAddCircle className="text-4xl" />
        </button>
      </form>
    </div>
  );
};

export default Form;
