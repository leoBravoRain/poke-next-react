import Icon from "@material-tailwind/react/Icon";
import Link from "next/link";

const NavBarTop = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-orange p-2 text-white h-11 flex justify-center text-center md:justify-start">
            {/* home page */}
            <p className="text-xl font-semibold md:ml-5">Pokedex</p>
        </div>
    );
};

export default NavBarTop;
