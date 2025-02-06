import axios from 'axios';

const DeleteButton = ({ personId, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      axios
        .delete(`http://localhost:3001/persons/${personId}`)
        .then(() => {
          onDelete(personId); // Notify the parent component to remove the person from the state
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
