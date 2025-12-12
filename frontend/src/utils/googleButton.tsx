import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GoogleIconButton() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      const res = await axios.post(backendUrl + "/api/registerGoogle", {
        accessToken: tokenResponse.access_token,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
      }
      localStorage.setItem("token", res.data.token);
      navigate("/explore");
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  return (
    <button onClick={() => login()} className="cursor-pointer">
      <FaGoogle size={20} />
    </button>
  );
}

export default GoogleIconButton;
