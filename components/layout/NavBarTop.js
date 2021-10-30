// import Icon from "@material-tailwind/react/Icon";
import Link from "next/link";
import DarkModeSwitch from "./DarkMode";

const NavBarTop = ({ changeDarkModeHandler, darkMode }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-orange p-2 text-white flex flex-row justify-center space-x-10 md:justify-between z-50 shadow-lg border-b-2 border-orange dark:bg-black dark:border-white">
            {/* home page */}
            <Link
                href={{
                    pathname: "/",
                }}
            >
                <p className="text-3xl font-semibold md:ml-5 cursor-pointer">
                    Pokedex
                </p>
            </Link>

            {/* items */}
            <div className="flex md:flex md:flex-row md:items-center md:justify-center pr-5">
                {/* dark mode */}
                <div className="flex items-center bg-">
                    <DarkModeSwitch
                        changeDarkModeHandler={changeDarkModeHandler}
                        darkMode={darkMode}
                    />
                </div>

                <div className="hidden md:flex md:flex-row">
                    <Link
                        href={{
                            pathname: "/",
                        }}
                    >
                        <p className="text-xl font-semibold md:ml-5 cursor-pointer">
                            Home
                        </p>
                    </Link>
                    <Link
                        href={{
                            pathname: "/catched",
                        }}
                    >
                        <p className="text-xl font-semibold md:ml-5 cursor-pointer">
                            Catched
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBarTop;
