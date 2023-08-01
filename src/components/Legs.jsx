import lines from "../data/lines";

const Legs = ({ legs }) => {
  const getColors = (leg) => {
    const line = lines.find((line) => leg.split(" to ")[0] === line.name);
    // if tube line
    if (line) {
      return {
        backgroundColor: line.color,
        color: line.black ? "black" : "white",
      };
      // else not tube line (e.g. walk or bus)
    } else {
      return {
        border: "1px solid black",
        backgroundColor: "#f2f2f2",
      };
    }
  };

  return (
    <div className="legs">
      {legs.map((leg) => (
        <div key={leg} className="leg" style={getColors(leg)}>
          {leg}
        </div>
      ))}
    </div>
  );
};

export default Legs;
