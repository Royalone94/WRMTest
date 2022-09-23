import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:8080";

export async function addUser(user_data) {
  try {
    const { data } = await axios.post(
      `${REACT_APP_BASE_URL}/api/add`,
      user_data
    );
    return data;
  } catch (e) {
    return { message: "Something is wrong", error: true };
  }
};

export async function findUser(id) {
  try {
    const { data } = await axios.get(`${REACT_APP_BASE_URL}/api/user/${id}`);
    return data;
  } catch (e) {
    return { message: "Something is wrong", error: true };
  }
}

export async function findAllUsers() {
  try {
    const { data } = await axios.get(`${REACT_APP_BASE_URL}/api/users_all`);
    return data;
  } catch (e) {
    return { message: "Something is wrong", error: true };
  }
}

export async function updateUser(id, update_data) {
  try {
    const { data } = await axios.patch(
      `${REACT_APP_BASE_URL}/api/update/${id}`,
      update_data
    );
    return data;
  } catch (e) {
    return { message: "Something is wrong", error: true };
  }
};

export async function deleteUser(id) {
  try {
    const { data } = await axios.delete(
      `${REACT_APP_BASE_URL}/api/delete/${id}`,
    );
    return data;
  } catch (e) {
    return { message: "Something is wrong", error: true };
  }
}