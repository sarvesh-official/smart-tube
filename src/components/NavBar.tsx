"use client"
import { Menu } from "lucide-react"
import Link from "next/link"
import { FaYoutube } from "react-icons/fa"
import { SearchBar } from "./SearchBar"
import ProfileDropDown from "./ProfileDropDown"
import Notification from "./Notification"
import { useYoutube } from "@/contexts/YoutubeContext"

const NavBar = () => {

  const {isOpen, setIsOpen} = useYoutube()

  return (
    <nav className="flex justify-between p-3 bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-b-none">
      {/* Logo */}
      <div className="flex gap-5 items-center">
        <Menu color="white" className="cursor-pointer" onClick={()=> setIsOpen(!isOpen)}/>
        <Link href={"/"} className="flex items-center gap-1">
        <FaYoutube color="#BA6EF2" size={34}/>
        <h1 className="text-white font-youtube text-2xl">SmartTube</h1>
        {/* <Image src={"/images/SmartTube.png"} alt="logo" width={100} height={100}/> */}
        </Link>
      </div>
      {/* Search Bar */}
      <SearchBar/>

      {/* Login */}
      <div className="flex gap-3">
        <Notification/>
        <ProfileDropDown/>
      </div>
    </nav>
  )
}

export default NavBar