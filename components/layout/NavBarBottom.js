import Icon from "@material-tailwind/react/Icon";
import Link from 'next/link';

const NavBarBottom = () => {
    return (
        <div className="fixed flex flex-row bottom-0 left-0 right-0 bg-orange p-1 justify-around items-center md:hidden shadow-lg border-t-2 border-orange dark:bg-black dark:border-white">
            {/* home page */}
            <div className="text-white items-center justify-center flex">
                <Link href="/">
                    <Icon
                        name="home"
                        size="4xl"
                    />
                </Link>
            </div>

            {/* catched */}
            <div className="text-white items-center justify-center flex">
                <Link href="/catched">
                    <Icon
                        name="favorites"
                        size="4xl"
                    />
                </Link>
            </div>
        </div>
    );
};

export default NavBarBottom;
