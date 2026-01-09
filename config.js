// config.js
export const API_URL = "http://192.168.0.30:3000";

useEffect(() => {
  fetch(`${API_URL}/users`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}, []);
