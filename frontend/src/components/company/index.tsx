import { useParams } from "react-router-dom";
import { useFetchCompany } from "../../hooks/use-fetch-company";
import { useEffect } from "react";
import Loading from "../loading";
const Company = () => {
  const { id } = useParams<{ id: string }>();
  const { company, isLoading, error, fetchCompany } = useFetchCompany();

  useEffect(() => {
    if (id) {
      fetchCompany(id);
    }
  }, [id, fetchCompany]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red text-red-700 p-4 mb-6">
        <p>{error}</p>
      </div>
    );
  }

  if (!company) {
    return <div>No se encontró la empresa</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Detalles de la Empresa</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{company.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Categoría:</span> {company.category}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Dirección:</span> {company.address}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Teléfono:</span> {company.phone_number}
            </p>
          </div>
          
          <div>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Activos:</span> ${company.assets}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Pasivos:</span> ${company.liabilities}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Ubicación:</span> {company.city?.name}{company.department ? `, ${company.department.name}` : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;

