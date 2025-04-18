import { Button } from "../ui";
import { Input } from "../ui/form-elements"

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-4 p-10 bg-white rounded-md">
      <h1 className="text-heading-s font-bold text-navy">Inicia sesión</h1>

      <form className="flex flex-col gap-2">
        <Input
          label="Email:"
          name="email"
          errorMessage={null}
          type="email"
          placeholder="Ingresa tu email"
        />

        <Button
          label="Iniciar sesión"
          type="submit"
          variant="primary"
        />
      </form>
    </div>
  )
}

export default LoginForm;
