export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
}
