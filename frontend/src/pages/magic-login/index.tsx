import { useContext, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import CenterMidleContainer from "../../templates/center-midle-container";
import { AuthContext } from "../../contexts/auth-context";

const MagicLogin = () => {
  const [searchParams] = useSearchParams();
  const { authenticate, state } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      authenticate({ token });
    }
  }, []);

  console.log(state);

  if (state.isAuthenticated) {
    return (
      <CenterMidleContainer>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Oli! {state.user?.email}</h2>
        </div>
      </CenterMidleContainer>
    );
  }

  if (state.isError || state.requiresAuth) {
    return <Navigate to="/login" />;
  }



  return (
    <CenterMidleContainer>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Iniciando sesión...</h2>
      </div>
    </CenterMidleContainer>
  );
};

export default MagicLogin;
