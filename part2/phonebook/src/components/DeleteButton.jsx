import axios from 'axios';

const DeleteButton = ({ personId, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      onDelete(personId);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
