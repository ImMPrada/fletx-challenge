import { useParams, Link } from "react-router-dom";
import { useFetchCompany } from "../../hooks/use-fetch-company";
import { useEffect } from "react";
import Loading from "../loading";
import { Button } from "../ui";

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalles de la Empresa</h1>
        <Link to={`/companies/${company.id}/edit`}>
          <Button 
            label="Editar empresa" 
            variant="secondary"
            type="button"
          />
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{company.name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Información general</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nombre</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Categoría</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.category}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Dirección</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.address}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.phone_number}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Activos</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${company.assets}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Pasivos</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${company.liabilities}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Departamento</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {company.department ? company.department.name : 'No especificado'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ciudad</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {company.city ? company.city.name : 'No especificada'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Company;

