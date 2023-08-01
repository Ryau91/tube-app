const CostAndTime = ({ cost, time }) => {
  return (
    <div className="cost-and-time">
      <span>{cost}</span>
      <span>{time}</span>
    </div>
  );
};

export default CostAndTime;
