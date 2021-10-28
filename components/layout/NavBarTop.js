import Icon from "@material-tailwind/react/Icon";
import Link from "next/link";

const NavBarTop = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-orange p-2 justify-center text-white h-11 text-center">
            {/* home page */}
            <p className="text-xl font-semibold">Pokedex</p>
        </div>
    );
};

export default NavBarTop;
