import { CenterMidleContainerProps } from "./types";

const CenterMidleContainer = ({children}: CenterMidleContainerProps) => {
    return (
        <div className="flex items-center justify-center h-screen w-screen">
            {children}
        </div>
    )
}

export default CenterMidleContainer;
