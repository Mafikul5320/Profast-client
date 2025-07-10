import { use } from "react";
import { AuthContext } from "../context/AuthContext";


const useAuth = () => {
    const userInfo = use(AuthContext)
    return userInfo
};

export default useAuth;