import SearchIcon from "./SearchIcon";

const SearchBox = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="absolute flex justify-center w-full mr-96 text-gray-500 dark:text-gray-400 ">
                <SearchIcon/>
            </div>
            <input
                className="h-10 w-1/2 disabled:cursor-not-allowed disabled:opacity-50 pl-11 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 sm:text-base rounded-lg"
                placeholder="Search"
                type="search"
            />
        </div>
    );
}

export default SearchBox;