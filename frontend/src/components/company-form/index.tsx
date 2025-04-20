import Form from './form';
import { useCompanyForm } from './use-company-form';

const CompanyForm = () => {
  const { formState, dispatch, handleSubmit } = useCompanyForm();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, (data) => {
      console.log('Datos de la empresa:', data);
    });
  };

  return (
    <Form
      formState={formState}
      dispatch={dispatch}
      handleSubmit={handleFormSubmit}
    />
  );
};

export default CompanyForm;
