import PropTypes from 'prop-types';

export default function TestButton({ getAllShapeFn, countDownHandler, timer }) {
  return (
    <div>
      <button
        type="button"
        onClick={getAllShapeFn}
        style={{
          width: '33.3vw', height: '50px', background: 'red', color: 'black', fontSize: '2rem', opacity: 1,
        }}
      >
        getAllShapeFn
      </button>
      <button
        type="button"
        onClick={countDownHandler}
        style={{
          width: '66.6vw', height: '50px', background: 'blue', color: 'white', fontSize: '2rem', opacity: 1,
        }}
      >
        getBus&StationFn(
        {timer}
        )
      </button>
    </div>
  );
}

TestButton.propTypes = {
  getAllShapeFn: PropTypes.func.isRequired,
  countDownHandler: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
