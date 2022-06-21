/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

export default function TestButton({
  assignRouteHandler, allBusHandler, getNearby, timer,
}) {
  return (
    <div>
      <button
        type="button"
        onClick={(bus) => assignRouteHandler(bus)}
        style={{
          width: '33.3vw', height: '50px', background: 'red', color: 'black', fontSize: '2rem', opacity: 1,
        }}
      >
        指定路線(
        {timer}
        )
      </button>
      <button
        type="button"
        onClick={allBusHandler}
        style={{
          width: '33.3vw', height: '50px', background: 'blue', color: 'white', fontSize: '2rem', opacity: 1,
        }}
      >
        全市區公車(
        {timer}
        )
      </button>
      <button
        type="button"
        onClick={getNearby}
        style={{
          width: '33.3vw', height: '50px', background: 'blue', color: 'white', fontSize: '2rem', opacity: 1,
        }}
      >
        行經路線
      </button>
    </div>
  );
}

TestButton.propTypes = {
  assignRouteHandler: PropTypes.func.isRequired,
  allBusHandler: PropTypes.func.isRequired,
  getNearby: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
