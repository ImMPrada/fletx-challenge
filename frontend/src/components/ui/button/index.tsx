import { ButtonProps } from "./types";

const Button = ({ label, type, variant, ...props }: ButtonProps) => {
  const buttonClasses = {
    primary: "bg-purple text-white rounded-md hover:bg-purple-light hover:text-purple hover:border-purple-light hover:border hover:border-purple-light",
    secondary: "bg-white text-purple rounded-md border border-purple hover:bg-purple hover:text-white hover:border-purple-light"
  }

  return (
    <button type={type} className={`${buttonClasses[variant]} px-4 py-2 w-full disabled:bg-white-light disabled:text-navy`} {...props}>
      {label}
    </button>
  )
}

export default Button;
