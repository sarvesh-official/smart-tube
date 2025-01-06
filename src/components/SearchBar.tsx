import { FaSearch } from "react-icons/fa"

export const SearchBar = () => {
  return (
    <form className="bg-violet-600 rounded-full w-1/3 pl-3 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 flex justify-between">
        <input type="text" placeholder="Search" className="bg-transparent w-full pr-1 focus:outline-none text-white" />
        <div className="bg-violet-600 backdrop-blur-md bg-opacity-20 rounded-r-full py-1 px-2 flex items-center justify-center cursor-pointer hover:scale-105">
        <FaSearch color="white" size={20}/>
        </div>
    </form>
  )
}
