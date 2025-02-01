import { HomeContent } from "@/models/homepage"
import { Project } from "@/models/project"


export const HomeLayout: React.FC<HomeContent> = (content) => {
    return (
        <>
            <div className="mx-auto md:mt-6 lg:m-10 lg:mt-24 items-center">
                <div className="items-center">
                    <div className="text-xl">
                        {content.contents.map((item, index) => <div key={index} className="m-3">{item}</div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export const ProjectLayout: React.FC<Project> = (content) => {
    return (
        <>
            <div className="mx-auto m-8 rounded-xl bg-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20 items-center">
                <div className="xl:flex items-center">
                    <div className="lg:shrink-0">
                        <img src={content.imagePath} alt={content.title} className="h-48 w-full object-cover xl:h-full xl:w-96 rounded"/>
                    </div>
                    
                    <div className="m-3 ml-6">
                        <div className="text-black font-medium">
                            {content.title}
                        </div>
                        <div className="text-slate-500">
                            <div className="mt-3">
                                {content.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}