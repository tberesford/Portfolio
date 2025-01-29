import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer(){

    const icons = [
        { image: <FaGithub size={30}/>, address: 'https://github.com/tberesford/' },
        { image: <FaLinkedin size={30}/>, address: 'https://www.linkedin.com/in/tom-beresford-20wi01/' },
        { image: <MdEmail size={30}/>, address: 'tberesfords@outlook.com' }
    ]

    return (
        <>
            <footer>
                <ul style={{display:'flex', flexDirection:'row'}}>
                    {icons.map((data, index) => {
                        if(data.address.includes('@')){
                            return (
                                <li className="m-2" key={index}>  
                                    <Link href={`mailto:${data.address}`} target="_blank">{data.image}</Link>
                                </li>
                            )
                        } else {
                            return (
                                <li className="m-2" key={index}>  
                                    <Link href={data.address} target="_blank">{data.image}</Link>
                                </li>
                            )
                        } 
                    })}
                </ul>
            </footer>
        </>
    )
}