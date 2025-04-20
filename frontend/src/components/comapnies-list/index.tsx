import { useEffect } from 'react';
import { useCompaniesList } from '../../hooks/use-companies-list';

const CompaniesList = () => {
  const { companies, isLoading, error, fetchCompanies } = useCompaniesList();

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (isLoading) {
    return <div>Cargando empresas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Empresas</h1>
      {companies && companies.length > 0 ? (
        <ul className="companies-list">
          {companies.map((company) => (
            <li key={company.id} className="company-item">
              <h3>{company.name}</h3>
              <div>
                <p><strong>Categoría:</strong> {company.category}</p>
                <p><strong>Dirección:</strong> {company.address}</p>
                <p><strong>Teléfono:</strong> {company.phone_number}</p>
                <p><strong>Activos:</strong> {company.assets}</p>
                <p><strong>Pasivos:</strong> {company.liabilities}</p>
                <p><strong>Ciudad:</strong> {company.city.name}</p>
                <p><strong>Departamento:</strong> {company.department.name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay empresas disponibles</p>
      )}
    </div>
  );
};

export default CompaniesList;
