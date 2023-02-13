import axiosClient from "./axiosClient";

const userApi = {
  getUsers: (params) => {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
  AddNewUser: (data) => {
    const url = "/users";
    return axiosClient.post(url, data);
  },
  UpdateUser: (id, data) => {
    const url = `/users/${id}`;
    return axiosClient.put(url, data);
  },
  DeleteUser: (id) => {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
