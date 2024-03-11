import { useState, useEffect } from "react";
import axios from "axios";

function Filter({ filterName, handleFilterName }) {
  return (
    <div>
      filter shown with
      <input value={filterName} onChange={handleFilterName} />
    </div>
  );
}

function NewContact({
  handleAddNewName,
  newName,
  handleNewName,
  newPhoneNumber,
  handleNewPhoneNumber,
}) {
  return (
    <form onSubmit={handleAddNewName}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

function Contacts({ filteredPersons }) {
  return (
    <div>
      {filteredPersons.map((person) => (
        <Contact key={person.id} person={person} />
      ))}
    </div>
  );
}

function Contact({ person }) {
  return (
    <p>
      {person.name} {person.phoneNumber}
    </p>
  );
}

function App() {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    // { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const filteredPersons = filterName
    ? persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
      )
    : persons;

  function handleNewName(e) {
    setNewName(e.target.value);
  }

  function handleNewPhoneNumber(e) {
    setNewPhoneNumber(e.target.value);
  }

  function handleFilterName(e) {
    setFilterName(e.target.value);
  }

  function handleAddNewName(e) {
    e.preventDefault();

    if (!newName || !newPhoneNumber) {
      alert("Both name and phone number should be filled in.");
      return;
    }

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }

    setPersons(
      persons.concat({
        name: newName,
        phoneNumber: newPhoneNumber,
        id: persons.length + 1,
      })
    );
    setNewName("");
    setNewPhoneNumber("");
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h3>Add a new</h3>
      <NewContact
        handleAddNewName={handleAddNewName}
        newName={newName}
        handleNewName={handleNewName}
        newPhoneNumber={newPhoneNumber}
        handleNewPhoneNumber={handleNewPhoneNumber}
      />

      <h2>Numbers</h2>
      <Contacts filteredPersons={filteredPersons} />
    </div>
  );
}

export default App;
