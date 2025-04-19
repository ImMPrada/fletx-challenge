import { CenterMidleContainerProps } from './types';

const CenterMidleContainer = ({ children }: CenterMidleContainerProps) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen font-sans bg-white-light">
      {children}
    </div>
  );
};

export default CenterMidleContainer;
