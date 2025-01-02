import Link from "next/link"
import { ReactElement } from "react"


export const GenericTab: React.FC<{children: ReactElement}> = ({children}) => {
    return (
        <div className="flex rounded-xl bg-slate-100 shadow-lg m-4 p-2 items-center">
            {children}
        </div>
    )
}

export const ProjectTab: React.FC<{children: ReactElement, path: string}> = ({children, path}) => {
    
    return (
        <div className="transition ease-in-out delay-100 duration-200 blue-500/20 hover:-translate-y-1 hover:scale-105">
            <Link href={path} target="_blank">
                {children}
            </Link>
        </div>
    )
}
