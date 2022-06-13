import api from "./api";

export const fetchTasks = async () => {
  const data = await api.get(`/todos`);
  return data.data
};

export const addTask = async (values) => {
  const data = await api.post(`/todos`, {...values, completed: false});
  return data
};

export const updateTask = async (values) => {
  const data = await api.put(`/todos/${values.id}`, values);
  return data
};

export const deleteTask = async (id) => {
  const data = await api.delete(`/todos/${id}`);
  return data
};
