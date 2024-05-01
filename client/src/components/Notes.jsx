import PropTypes from "prop-types";
const Notes = ({ note }) => {
  console.log(note._id);
  return (
    <div className="bg-white text-black p-4 font-pop rounded-lg">
      <h1 className="text-2xl font-bold font-lobStar pb-3">{note.title}</h1>
      <p className="text-base">{note.note}</p>
    </div>
  );
};
Notes.propTypes = {
  note: PropTypes.object.isRequired,
};
export default Notes;
