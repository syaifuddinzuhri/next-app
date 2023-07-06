import { Icon } from "@iconify/react";
const Icons = ({ icon, className, width, rotate, hFlip, vFlip }: any) => {
  return (
    <>
      <Icon
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </>
  );
};

export default Icons;
