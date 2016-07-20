const Chart = (props) => {
  return (
    <div>
      <p>{JSON.stringify(props.data)}</p>
      <p>{props.type}</p>
    </div>
  );
};

module.exports = Chart;
