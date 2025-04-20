import { SelectProps } from './types';

const Select= ({ label, name, errorMessage, options, ...props }: SelectProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={name} className="block text-body-s font-medium text-navy">
        {label}
      </label>
      {errorMessage && (
        <p className="mt-1 text-body-s text-red">{errorMessage}</p>
      )}
      <select
        id={name}
        name={name}
        className="w-full bg-white px-2 py-2 border border-grey-light rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent text-navy"
        {...props}
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
