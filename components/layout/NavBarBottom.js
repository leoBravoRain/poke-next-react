import Icon from "@material-tailwind/react/Icon";
import Link from 'next/link';

const NavBarBottom = () => {
    return (
        <div className="fixed flex flex-row bottom-0 left-0 right-0 bg-orange p-1 justify-around items-center h-11 md:hidden">
            {/* home page */}
            <div className="text-white items-center justify-center flex">
                <Link href="/">
                    <Icon
                        name="home"
                        // onClick={() => }
                        size="4xl"
                        // className="text-white bg-white"
                    />
                </Link>
            </div>

            {/* catched */}
            <div className="text-white items-center justify-center flex">
                <Link href="/catched">
                    <Icon
                        // name="catchingPokemon"
                        name="favorites"
                        // onClick={() => }
                        size="4xl"
                        // className="text-white bg-white"
                    />
                </Link>
            </div>
        </div>
    );
};

export default NavBarBottom;
