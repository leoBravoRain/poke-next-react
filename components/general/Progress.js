import Image from "next/image";

const Progress = () => {
    return (
        <div className="flex flex-row justify-center items-center my-10 animate-pulse">
            {/* <Progress color="deepOrange" value="50" percentage={false} /> */}
            {/* <p className="text-md font-semibold animate-spin ">Loading...</p> */}
            <div className="h-12 w-12 mr-5">
                <Image
                    src="/images/pokeball.png"
                    width="224"
                    height="225"
                    className="rounded-full"
                    layout="responsive"
                    alt="pokeball"
                />
            </div>
            <p>Loading ...</p>
        </div>
    );
};

export default Progress;
