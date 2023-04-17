import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const getTodos = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/todos?owner=${id}`);
    return res.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

export const createTodo = async (payload) => {
  const { title, owner, isDone } = payload;
  try {
    const res = await axios.post(`${baseUrl}/todos`, {
      title,
      owner,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axios.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]:', error);
  }
};
