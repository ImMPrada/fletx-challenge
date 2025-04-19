export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  type: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary';
}
