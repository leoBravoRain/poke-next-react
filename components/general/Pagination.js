import Icon from "@material-tailwind/react/Icon";

const Pagination = ({offset, changePageHandler}) => {

    console.log(offset);

    return (
        <div className="flex justify-around my-3">
            {/* display left if it's not the first one */}
            {offset !== 0 && (
                <div className="border rounded-full items-center justify-center flex border-orange text-orange">
                    <Icon
                        name="keyboard_arrow_left"
                        onClick={() => changePageHandler("left")}
                        // onClick={changePageHandler("left")}
                        size="10"
                        className=""
                    />
                </div>
            )}
            <div className="border rounded-full items-center justify-center flex border-orange text-orange">
                <Icon
                    name="keyboard_arrow_right"
                    onClick={() => changePageHandler("right")}
                    // onClick={changePageHandler("right")}
                    size="10"
                />
            </div>
        </div>
    );
};

export default Pagination;
