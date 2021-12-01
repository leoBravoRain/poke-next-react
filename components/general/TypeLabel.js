import Link from 'next/link';

const TypeLabel = ({type}) => {
    return (
        <Link
            href = {`/type/${type.type.name}`}
        >
            <div className="bg-orange px-2 py-1 rounded-2xl text-sm uppercase font-semibold text-white text-center max-w-min cursor-pointer">
                {type.type.name}
            </div>
        </Link>
    );
};

export default TypeLabel;