import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";

function AdminProtected({ children }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      setIsAuthorized(false);
    } else {
      const infos = jwtDecode(token);
      if (!infos) {
        navigate("/");
        setIsAuthorized(false);
      } else if (!infos.cargo.is_admin) {
        navigate("/");
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    }
  }, []);

  if (isAuthorized === "loading") {
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-gray-900">
        <div className="relative flex flex-col items-center justify-center animate-ping py-2 px-6 border tracking-wide text-white bg-black hover:bg-white hover:text-black transition">
          Chargement de la page...
        </div>
      </div>
    );
  }

  return isAuthorized ? children : null;
}

AdminProtected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProtected;
