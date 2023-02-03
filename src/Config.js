const BASE_URL = 'https://pre-onboarding-selection-task.shop';
const API = {
  signup: `${BASE_URL}/auth/signup`,
  signin: `${BASE_URL}/auth/signin`,
  createTODO: `${BASE_URL}/todos`,
  getTodos: `${BASE_URL}/todos`,
  updateTodo: `${BASE_URL}/todos`,
  deleteTodo: `${BASE_URL}/todos`,
};
export default API;