import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CiSaveUp1 } from "react-icons/ci";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";

const Notes = ({ note, handleDelete, handleFetchNotes }) => {
  const { register, handleSubmit } = useForm();
  const { setLoading } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = (data, event) => {
    const { updatedTitle, updatedNote } = data;
    setLoading(true);
    axios
      .put(`https://server-dun-pi.vercel.app/notes/${note._id}`, {
        title: updatedTitle,
        note: updatedNote,
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Note Updated",
            icon: "success",
            confirmButtonText: "Close",
          })
            .then(() => {
              setLoading(false);
              event.target.reset();
              setIsEditing(false);
              handleFetchNotes();
            })
            .catch((err) => console.error(err));
        }
      });
  };
  return (
    <>
      <div className="bg-white text-black p-4 font-pop rounded-lg">
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="font-pop flex flex-col text-black rounded-lg"
          >
            <input
              type="text"
              placeholder="Title"
              className="bg-[#fff] text-black mb-4 border-none outline-none font-lobStar text-2xl"
              {...register("updatedTitle")}
              defaultValue={note.title}
              required
            />
            <textarea
              placeholder="Take a note..."
              id=""
              cols="4"
              rows="0"
              className="bg-[#fff] text-black border-none outline-none resize-none"
              {...register("updatedNote")}
              defaultValue={note.note}
              required
            ></textarea>
            <div className="flex gap-2">
              <button
                type="submit"
                className="text-xl mt-4 hover:text-green-600"
              >
                <CiSaveUp1 />
              </button>
              <button
                className="text-xl mt-4 hover:text-red-600"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                <MdClose />
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-2xl font-bold font-lobStar pb-3">
              {note.title}
            </h1>
            <p className="text-base">{note.note}</p>
            <div className="actions flex justify-end mt-4 gap-3">
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <HiOutlinePencilSquare className="text-xl hover:text-green-500" />
              </button>
              <button onClick={() => handleDelete(note._id)}>
                <MdDelete className="text-xl hover:text-red-600" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
Notes.propTypes = {
  note: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleFetchNotes: PropTypes.func.isRequired,
};
export default Notes;
