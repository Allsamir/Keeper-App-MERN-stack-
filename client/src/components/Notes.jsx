import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const Notes = ({ note, handleDelete, showModal, handleFetchNotes }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, event) => {
    const { title, updatedNote } = data;
    axios
      .put(`http://localhost:3000/notes/${note._id}`, {
        title: title,
        note: updatedNote,
      })
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Note Updated",
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            event.target.reset();
            handleFetchNotes();
          });
        }
      });
  };
  return (
    <>
      <div className="bg-white text-black p-4 font-pop rounded-lg">
        <h1 className="text-2xl font-bold font-lobStar pb-3">{note.title}</h1>
        <p className="text-base">{note.note}</p>
        <div className="actions flex justify-end mt-4 gap-3">
          <button
            onClick={() => {
              showModal();
            }}
          >
            <HiOutlinePencilSquare className="text-xl hover:text-green-500" />
          </button>
          <button onClick={() => handleDelete(note._id)}>
            <MdDelete className="text-xl hover:text-red-600" />
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white text-black">
          <div className="modal-action flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="font-pop flex flex-col text-black p-4 rounded-lg"
              method="dialog"
            >
              <input
                type="text"
                placeholder="Title"
                className="bg-[#fff] text-black mb-4 border-none outline-none"
                {...register("title")}
                defaultValue={note.title}
                required
              />
              <textarea
                placeholder="Take a note..."
                id=""
                cols="4"
                rows="4"
                className="bg-[#fff] text-black border-none outline-none resize-none"
                {...register("updatedNote")}
                defaultValue={note.note}
                required
              ></textarea>
              <input
                className="btn btn-outline text-black"
                type="submit"
                value={`Update Note`}
              />
            </form>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
Notes.propTypes = {
  note: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  handleFetchNotes: PropTypes.func.isRequired,
};
export default Notes;
