import { SpinLoading } from 'respinner'

interface LoadingProps {
  size?: number;
}

const Loading = ({ size = 40 }: LoadingProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <SpinLoading fill="#A729F5" borderRadius={10} count={20} size={size} />
    </div>
  );
};

export default Loading;
