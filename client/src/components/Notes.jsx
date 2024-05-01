import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Notes = ({ note, handleDelete, showModal }) => {
  return (
    <div className="bg-white text-black p-4 font-pop rounded-lg">
      <h1 className="text-2xl font-bold font-lobStar pb-3">{note.title}</h1>
      <p className="text-base">{note.note}</p>
      <div className="actions flex justify-end mt-4 gap-3">
        <button onClick={showModal}>
          <HiOutlinePencilSquare className="text-xl hover:text-green-500" />
        </button>
        <button onClick={() => handleDelete(note._id)}>
          <MdDelete className="text-xl hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};
Notes.propTypes = {
  note: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};
export default Notes;
