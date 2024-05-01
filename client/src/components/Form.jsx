import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, event) => {
    console.log(data.title, data.body);
  };
  return (
    <div className="text-center my-12 w-96 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-pop flex flex-col bg-[#fff] text-black p-4 shadow-2xl rounded-2xl relative"
      >
        <input
          type="text"
          placeholder="Title"
          className="bg-[#fff] text-black mb-4 border-none outline-none"
          {...register("title")}
        />
        <textarea
          placeholder="Take a note ..."
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
