import Switch from "react-switch";

const DarkModeSwitch = ({ changeDarkModeHandler, darkMode }) => {
    return (
        <div className="m-auto flex flex-row">
            <Switch
                height={26}
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={changeDarkModeHandler}
                checked={darkMode}
                offColor="#dddddd"
                onColor="#7ec14e"
                // style= {{
                //   backgroundColor: "red",
                // }}
                // className="bg-red-100"
            />
            <p className="m-auto ml-1 text-xs">
                {darkMode ? "Dark" : "Light"}
            </p>
        </div>
    );
};

export default DarkModeSwitch;
