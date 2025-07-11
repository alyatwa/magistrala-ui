import { Zap } from "lucide-react"


export const Logo = () => {
    return (<div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
        </div>
        <span className="text-white font-semibold text-lg">FlowGen</span>
    </div>)
}