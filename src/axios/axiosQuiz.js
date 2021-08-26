import axios from "axios";

export default axios.create({
  baseURL:
    "https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/",
});
