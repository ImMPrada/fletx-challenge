import { ReactNode, useContext, useEffect } from "react";
import { FlashContext } from "../../contexts/flash-context";

const Flash = ({ children }: { children: ReactNode }) => {
  const { message, type, blankFlash } = useContext(FlashContext);

  const setColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-light text-green';
      case 'error':
        return 'bg-red-light text-red';
      case 'warning':
        return 'bg-yellow-light text-navy';
      case 'info':
        return 'bg-blue-light text-blue';
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        blankFlash();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, blankFlash]);
    
  const handleClick = () => {
    blankFlash();
  }


  return (
    <>
      {children}

      {message && (
        <div
          className={`hover:cursor-pointer absolute w-full h-auto top-0 left-0 px-4 py-2 flex justify-center items-center ${setColor()}`}
          onClick={handleClick}
        >
          <p className="text-body-m font-bold text-center font-sans">{message}</p>
        </div>
      )}
    </>
  );
};

export default Flash;
