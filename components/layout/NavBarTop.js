// import Icon from "@material-tailwind/react/Icon";
import Link from "next/link";

const NavBarTop = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-orange p-2 text-white flex flex-row justify-center md:justify-between z-50 shadow-lg">
            {/* home page */}
            <Link
                href={{
                    pathname: "/",
                }}
            >
                <p className="text-3xl font-semibold md:ml-5 cursor-pointer">Pokedex</p>
            </Link>
            {/* items */}
            <div className="hidden md:flex md:flex-row pr-5">
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
    );
};

export default NavBarTop;
