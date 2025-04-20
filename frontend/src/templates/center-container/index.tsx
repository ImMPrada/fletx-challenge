import { CenterContainerProps } from './types';

const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
    <div className="flex items-center justify-start pt-30 h-screen w-screen font-sans bg-white-light">
      {children}
    </div>
  );
};

export default CenterContainer;
