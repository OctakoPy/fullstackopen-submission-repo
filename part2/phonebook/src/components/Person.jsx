import DeleteButton from './DeleteButton';

const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <DeleteButton personId={person.id} onDelete={onDelete} />
    </li>
  );
};

export default Person;
