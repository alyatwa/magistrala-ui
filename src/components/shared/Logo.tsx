import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn(`flex items-center space-x-2`, className)}>
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
        <Zap className="w-4 h-4 text-black" />
      </div>
      <span className="text-white font-semibold text-lg">CTX</span>
    </div>
  );
};
