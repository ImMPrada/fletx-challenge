import { SpinLoading } from 'respinner'

const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <SpinLoading fill="#A729F5" borderRadius={10} count={20} size={100} />
    </div>
  );
};

export default Loading;
