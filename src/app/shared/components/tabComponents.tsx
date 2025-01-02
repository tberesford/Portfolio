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
        <div>
            <Link href={path} target="_blank">
                {children}
            </Link>
        </div>
    )
}
