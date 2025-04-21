import { useEffect } from "react";
import { useMe } from "../../hooks/use-me";
import Loading from "../loading";

const Profile = () => {
  const { user, isLoading, fetchUser } = useMe();

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-full p-6 bg-gray-50 rounded-lg">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mi Perfil</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Información Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.email && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Correo electrónico</span>
                <span className="font-medium">{user.email}</span>
              </div>
            )}
            
            {user?.name && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Nombre</span>
                <span className="font-medium">{user.name}</span>
              </div>
            )}
            
            {user?.lastName && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Apellido</span>
                <span className="font-medium">{user.lastName}</span>
              </div>
            )}
            
            {user?.phoneNumber && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Teléfono</span>
                <span className="font-medium">{user.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Información Laboral</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.workPosition && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Puesto</span>
                <span className="font-medium">{user.workPosition}</span>
              </div>
            )}
            
            {user?.salary && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Salario</span>
                <span className="font-medium">${user.salary}</span>
              </div>
            )}
            
            {user?.company?.name && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Empresa</span>
                <span className="font-medium">{user.company.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;