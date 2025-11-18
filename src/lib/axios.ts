import axios from 'axios';

// Створення окремого інстансу Axios
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Якщо токен доступний у змінній середовища -- додаємо в Authorization
const token = import.meta.env.VITE_API_AUTH_TOKEN;
if (token) {
	apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Інтерцептор для відповіді (обробка помилок)
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Тут можна додати глобальну обробку помилок
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		console.error('API Error:', error.response?.data || error.message);
		// Можна також виводити повідомлення користувачу через toast
		// toast.error(error.response?.data?.message || 'Unknown error');
		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		return Promise.reject(error);
	}
);
export default apiClient;