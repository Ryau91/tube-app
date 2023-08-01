import { HiOutlineLightBulb } from "react-icons/hi";

const Header = ({ handleToggleDarkMode }) => {
  return (
    <div className="header">
      <h1>Tube Journey Planner</h1>
      {/* we pass in a function to handleToggleDarkMode that simply switches between true and false */}
      <button
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        className="grey-button"
      >
        <HiOutlineLightBulb />
      </button>
    </div>
  );
};

export default Header;
