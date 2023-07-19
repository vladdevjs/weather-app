const moment = require('moment');

const DayCard = ({ item, degreeType }) => {
  let newDate = new Date();
  const weekday = item.dt * 1000;
  newDate.setTime(weekday);

  const celsius = Math.round(item.main.temp);
  const fahrenheit = Math.round((celsius * 9) / 5 + 32);
  const imgURL = `owf owf-${item.weather[0].id} owf-5x`;

  function convertDegreesToDirection(degrees) {
    const directionMap = new Map([
      [0, 'N'],
      [45, 'NE'],
      [90, 'E'],
      [135, 'SE'],
      [180, 'S'],
      [225, 'SW'],
      [270, 'W'],
      [315, 'SW'],
    ]);

    for (const [direction, value] of directionMap) {
      if (degrees >= direction && degrees < direction + 45) {
        return value;
      }
    }

    return 'Недоступно';
  }

  return (
    <div className='col-sm-2'>
      <div className='card'>
        <h3 className='card-title'>{moment(newDate).format('dddd')}</h3>
        <p className='text-muted'>{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <i className={imgURL}></i>
        <h2>{degreeType === 'celsius' ? celsius + '°C' : fahrenheit + '°F'}</h2>
        <div className='card-body'>
          <p className='card-text'>{item.weather[0].description}</p>
          <p className='card-text'>
            <strong className='fs-5'>{Math.round(item.wind.speed)} m/s</strong> (up to {Math.round(item.wind.gust)} m/s)
          </p>
          <p className='card-text'>{convertDegreesToDirection(item.wind.deg)}</p>
        </div>
      </div>
    </div>
  );
};

export { DayCard };
