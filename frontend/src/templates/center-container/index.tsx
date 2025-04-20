import { CenterContainerProps } from './types';

const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
    <div className="flex items-start justify-center p-8 h-full w-screen font-sans">
      {children}
    </div>
  );
};

export default CenterContainer;
