import CenterContainer from '../../templates/center-container';
import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import CompanyForm from '../../components/company-form';

const NewCompany = () => {
  return (
    <ContainerWithFloatingNavbar>
      <CenterContainer>
        <CompanyForm />
      </CenterContainer>
    </ContainerWithFloatingNavbar>
  );
};

export default NewCompany;
