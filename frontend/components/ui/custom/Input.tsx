type Props = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name?: string;
  id?: string;
  required?: boolean;
};

const Input = (props: Props) => {
  return (
    <input
      aria-label={props.placeholder}
      type={props.type}
      className='text-sm flex w-full border-0 border-b bg-gray-50 border-gray-400 px-2 py-2 mb-2 focus:border-black focus:outline-none'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      id={props.id}
      required={props.required || true}
    />
  );
};

export default Input;
