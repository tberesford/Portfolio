import { Project } from "../models/project";
import { ProjectLayout } from "./layouts";
import { ProjectTab } from "../shared/components/tabComponents";

const ProjectContent: Project[] = [
    {
        sitePath: "https://www.powerdashboard.co.uk",
        imagePath: "powerdashboard.png",
        title: "Power Dashboard",
        description: "Power Dashboard showcases National Grid and related data in realtime. On-going development."
    },
    {
        sitePath: "https://www.powerdashboard.co.uk/tesla-battery",
        imagePath: "teslabattery.png",
        title: "Power Dashboard - Tesla Powerwall",
        description: "My home's own Tesla Powerwall data in realtime - new content coming soon!"
    },
    {
        sitePath: "https://github.com/tberesford",
        imagePath: "github.png",
        title: "Git",
        description: "Check out some of my other past projects, as well as new upcoming work!"
    }
]

export const Projects: React.FC = () => {
    return (
        <>
            {ProjectContent.map((project, index) => {
                return (
                    <ProjectTab key={index} path={project.sitePath}>
                        <>
                            <ProjectLayout {...project}/> { /* Site path not used in layout - not displayed */}
                        </>
                    </ProjectTab>
                )
            })}
        </>
    )
}
