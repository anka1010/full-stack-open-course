import { useState, useEffect } from "react";
import PersonService from "./services/person";
import Notification from "./components/Notification";

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

function Contacts({ filteredPersons, handleDeletePerson }) {
  return (
    <div>
      {filteredPersons.map((person) => (
        <Contact
          key={person.id}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </div>
  );
}

function Contact({ person, handleDeletePerson }) {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>
    </p>
  );
}

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    PersonService.getAll().then((allPersons) => setPersons(allPersons));
  }, []);

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [successMesasge, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      )
        return;

      existingPerson.number = newPhoneNumber;
      PersonService.update(existingPerson.id, existingPerson)
        .then((updatedPerson) => {
          setSuccessMessage(`${updatedPerson.name} phone number is updated`);
          setTimeout(() => setSuccessMessage(""), 2000);
        })
        .catch((error) => {
          setErrorMessage(
            `information of ${existingPerson.name} has already been removed from the server`
          );
          setTimeout(() => setErrorMessage(""), 2000);
        });
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
      };

      PersonService.addNew(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setSuccessMessage(`${addedPerson.name} is added to phonebook`);
        setTimeout(() => setSuccessMessage(""), 2000);
      });
    }

    setNewName("");
    setNewPhoneNumber("");
  }

  function handleDeletePerson(id) {
    const deletedItem = persons.find((person) => person.id === id);
    if (!window.confirm(`delete ${deletedItem.name}?`)) return;

    PersonService.deleteItem(id)
      .then((response) => {
        setSuccessMessage(
          `${deletedItem.name} has been removed from phonebook`
        );
        setTimeout(() => setSuccessMessage(""), 2000);
        setPersons(() =>
          persons.filter((person) => person.id !== deletedItem.id)
        );
      })
      .catch((error) => {
        setErrorMessage(
          `information of ${deletedItem.name} has already been removed from the server`
        );
        setTimeout(() => setErrorMessage(""), 2000);
      });
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMesasge} style={"success"} />
      <Notification message={errorMessage} style={"error"} />
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
      <Contacts
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
}

export default App;

// {
//   "persons": [
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     }
//   ]
// }
