import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CenterMidleContainer from "../../templates/center-midle-container";
import { AuthContext } from "../../contexts/auth-context";

const MagicLogin = () => {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      authenticate({ token });
    }
  }, []);



  return (
    <CenterMidleContainer>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Iniciando sesión...</h2>
      </div>
    </CenterMidleContainer>
  );
};

export default MagicLogin;
