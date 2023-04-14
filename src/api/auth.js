import axios from 'axios';

const authURL = 'http://localhost:8000/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return { success: false, ...data };
  } catch (error) {
    console.error('[Login Failed]:', error);
    return { success: false };
  }
};
