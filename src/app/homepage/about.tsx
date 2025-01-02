import { HomeContent } from "../models/homepage"
import { HomeLayout } from "./layouts"

const aboutMe: HomeContent = {
    title: "Tom Beresford",
    contents: [
        ["Hi there! Currently, I work as a Graduate Application Support Engineer, while aiming to transition into a full-time full stack engineering role. This portfolio, built with Next.js, React, and Tailwind CSS, is my way of sharing what I’ve created and learned. It’s a work in progress, so stay tuned for updates."],
        // ["I love learning new technologies and tackling challenging problems through code. My background spans full stack development using TypeScript, React, Node.js, and Next.js, along with data science and machine learning experience gained during university with Python."],
        ["A highlight of my work is Power Dashboard, a project built with Next.js and React on the frontend and a serverless Python backend powered by Azure. This project demonstrates my ability to integrate modern frontend frameworks with scalable backend solutions."],
        ["I’ve also created a Python script to optimize Tesla Powerwall energy usage and completed Advent of Code challenges in C# and Python - because who doesn't love a good coding puzzle?"],
        ["Thanks for visiting—I hope you enjoy exploring my projects!"]
    ]
}

export const About: React.FC = () => {
    return (
        <>
            <HomeLayout {...aboutMe}/>
        </>
    )
}