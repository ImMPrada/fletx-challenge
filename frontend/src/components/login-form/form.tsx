import { Button } from '../ui';
import { Input } from '../ui/form-elements';
import { FormProps } from './types';

const Form = ({
  email,
  magicLinkState,
  error,
  handleInputChange,
  handleSubmit,
}: FormProps) => {
  return (
    <div className="flex flex-col gap-4 p-10 bg-white rounded-md w-full mx-2 max-w-[500px]">
      <h1 className="text-heading-s font-bold text-navy">Inicia sesión</h1>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          label="Email:"
          name="email"
          errorMessage={error?.email}
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={handleInputChange}
        />

        <Button
          label="Iniciar sesión"
          type="submit"
          variant="primary"
          disabled={magicLinkState.isLoading}
        />
      </form>
    </div>
  );
};

export default Form;
