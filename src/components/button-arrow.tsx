import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";
import { ReactNode } from "react";

interface ButtonArrowProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  classNameIcon?:string
}

export default function ButtonArrow({
  children,
  icon = <IconArrowUpRight className="text-white" />,
  className = "",
  classNameIcon="",
  onClick,
}: ButtonArrowProps) {
  return (
    <Button
      className={cn(
        `flex items-center gap-2 w-fit shadow-none rounded-full ps-4 pe-1 py-3 bg-white hover:bg-white border border-[#539f58]`,
        className
      )}
      onClick={onClick}
    >
      <span className="text-xs font-medium text-black min-w-[55px]">
        {children}
      </span>
      <div className={cn("flex aspect-square h-7 w-7 items-center justify-center rounded-full bg-[#539f58]", 
        classNameIcon
      )}>
        {icon}
      </div>
    </Button>
  );
}
