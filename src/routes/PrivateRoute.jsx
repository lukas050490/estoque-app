import { Navigate } from "react-router-dom";
import {api} from '../services/api';
export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    
    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}