import { useState, useEffect, useRef } from 'react';
import { DayCard } from './DayCard';
import { DegreeToggle } from './DegreeToggle';

function WeekContainer() {
  const [data, setData] = useState({});
  const [city, setCity] = useState(null);
  const inputRef = useRef();
  const TOKEN = process.env.WEATHER_TOKEN;

  const getData = (cityQuery) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&units=metric&appid=${TOKEN}`)
      .then((res) => res.json())
      .then(({ list }) => {
        const dailyData = list.filter((reading) => reading.dt_txt.includes('18:00:00'));
        setData({ fullData: list, dailyData, degreeType: 'celsius' });
      })
      .catch((e) => {
        setData({});
        console.log(e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCity = inputRef.current.value;
    setCity(selectedCity);
    localStorage.setItem('selectedCity', selectedCity);
    getData(selectedCity);
    window.history.pushState({}, '', `?city=${encodeURIComponent(selectedCity)}`);
  };

  const updateForecastDegree = (event) => {
    setData({ ...data, degreeType: event.target.value });
  };

  const formatCards = () => {
    return data.dailyData.map((item, index) => <DayCard key={index} item={item} degreeType={data.degreeType} />);
  };

  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    const urlParams = new URLSearchParams(window.location.search);
    const urlCity = urlParams.get('city');
    if (urlCity) {
      setCity(decodeURIComponent(urlCity));
    } else if (savedCity) {
      setCity(savedCity);
    } else {
      setCity('Volgograd');
    }
  }, []);

  useEffect(() => {
    if (city) {
      getData(city);
    }
  }, [city]);

  useEffect(() => {
    const handlePopstate = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlCity = urlParams.get('city');
      if (urlCity) {
        setCity(decodeURIComponent(urlCity));
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div className='container pt-2'>
      <DegreeToggle degreeType={data.degreeType} action={updateForecastDegree} />

      <form onSubmit={handleSubmit} className='row g-3 m-1'>
        <div className='col-10'>
          <input type='text' className='form-control' ref={inputRef} placeholder='Enter city' aria-label='City' />
        </div>
        <div className='col-2'>
          <button className='btn btn-outline-primary' type='button' onClick={handleSubmit} id='button-addon2'>
            Get Forecast
          </button>
        </div>
      </form>

      <h1 className='display-1 jumbotron my-3'>5-Day Forecast.</h1>
      <h5 className='my-5 display-5 text-muted'>{city && city.toUpperCase()}</h5>
      <div className='row justify-content-center my-5'>{data.dailyData ? formatCards() : 'Please enter City'}</div>
    </div>
  );
}

export { WeekContainer };
