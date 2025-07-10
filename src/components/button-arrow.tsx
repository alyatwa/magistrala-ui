import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";
import { ReactNode } from "react";

interface ButtonArrowProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ButtonArrow({
  children,
  icon = <IconArrowUpRight className="text-white" />,
  className = "",
  onClick,
}: ButtonArrowProps) {
  return (
    <Button
      className={cn(
        `flex items-center gap-2 rounded-full px-4 py-6 bg-white hover:bg-white border-green-300`,
        className
      )}
      onClick={onClick}
    >
      <span className="text-sm font-medium text-black">{children}</span>
      <div className="flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-green-600">
        {icon}
      </div>
    </Button>
  );
}
