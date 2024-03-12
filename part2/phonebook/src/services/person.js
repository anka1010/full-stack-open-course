import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function addNew(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
}

function deleteItem(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, addNew, deleteItem, update };
