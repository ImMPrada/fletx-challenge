import { CenterContainerProps } from './types';

const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
    <div className="flex items-start justify-center pt-32 pb-8 px-8 min-h-screen w-screen font-sans bg-red">
      {children}
    </div>
  );
};

export default CenterContainer;
