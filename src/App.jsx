import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const App = () => {
  const [Depart, setDepart] = useState('');
  const [Arrive, setArrive] = useState('');
  const [date, setDate] = useState(null);
  const [infantLval, setInfantLval] = useState(0);
  const [infantSval, setInfantSval] = useState(0);
  const [adultVal, setAdultVal] = useState(0);
  const [childVal, setChildVal] = useState(0);
  const [showList, setShowList] = useState(false);
  const allUsers = adultVal + childVal + infantSval + infantLval;
  const [type, setType] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchSkyId = async (city) => {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${city}&locale=en-US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8d09248dd0mshf4ac8b8ab6d23e1p1048a7jsn642ba9252b26",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.data[0].skyId;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEntityId = async (city) => {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${city}&locale=en-US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8d09248dd0mshf4ac8b8ab6d23e1p1048a7jsn642ba9252b26",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.data[0].entityId;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFlightDetails = async () => {
    const originSkyId = await fetchSkyId(Depart);
    const destSkyId = await fetchSkyId(Arrive);
    const originEntityId = await fetchEntityId(Depart);
    const destEntityId = await fetchEntityId(Arrive);
    

    const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destEntityId}&date=${date}&cabinClass=${type}&adults=${adultVal}&childrens=${childVal}&infants=${
      infantLval + infantSval
    }&sortBy=best&currency=USD&market=en-US&countryCode=US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8d09248dd0mshf4ac8b8ab6d23e1p1048a7jsn642ba9252b26",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const flights = await result.data.itineraries;
      setFlightData(flights);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };
  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60); // Get the total hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  }

  return (
    <>
      <div className="bg--image"></div>
      <h1 className="heading">Flights</h1>
      <div className="dataBox">
        <div className="users">
          <button
            className="user--button"
            onClick={() => setShowList(!showList)}
          >
            <FaRegUser />
            {allUsers}
            <FaAngleDown />
          </button>
          {showList && (
            <ul className="seatData">
              <li>
                <p>Adults</p>
                <div className="value">
                  <button
                    onClick={() => {
                      setAdultVal(adultVal + 1);
                    }}
                  >
                    +
                  </button>
                  <p>{adultVal}</p>
                  <button
                    onClick={() => {
                      if (adultVal === 0) {
                        setAdultVal(0);
                      } else {
                        setAdultVal(adultVal - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </li>
              <li>
                <p>Children</p>
                <div className="value">
                  <button
                    onClick={() => {
                      setChildVal(childVal + 1);
                    }}
                  >
                    +
                  </button>
                  <p>{childVal}</p>
                  <button
                    onClick={() => {
                      if (childVal === 0) {
                        setChildVal(0);
                      } else {
                        setChildVal(childVal - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </li>
              <li>
                <div>
                  <p>Infants</p>
                  <p>on Seat</p>
                </div>
                <div className="value">
                  <button
                    onClick={() => {
                      setInfantSval(infantSval + 1);
                    }}
                  >
                    +
                  </button>
                  <p>{infantSval}</p>
                  <button
                    onClick={() => {
                      if (infantSval === 0) {
                        setInfantSval(0);
                      } else {
                        setInfantSval(infantSval - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </li>
              <li>
                <div>
                  <p>Infants</p>
                  <p>on Lap</p>
                </div>
                <div className="value">
                  <button
                    onClick={() => {
                      setInfantLval(infantLval + 1);
                    }}
                  >
                    +
                  </button>
                  <p>{infantLval}</p>
                  <button
                    onClick={() => {
                      if (infantLval === 0) {
                        setInfantLval(0);
                      } else {
                        setInfantLval(infantLval - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </li>
              <button
                onClick={() => {
                  setShowList(!showList);
                }}
              >
                Done
              </button>
            </ul>
          )}
        </div>
        <select
          name="FlightType"
          className="flightType"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="">Select Class</option>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="first">First</option>
        </select>
      </div>
      <form className="flightData">
        <input
          type="text"
          placeholder="Enter Departure City"
          onChange={(e) => {
            setDepart(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Destination City"
          onChange={(e) => {
            setArrive(e.target.value);
          }}
        />
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if(allUsers===0){
              alert('Enter Total People Who are Traveling')
            }
            else if(type==='') {
              alert('Select Cabin Class Type')
            }
            else if(Depart==='' || Arrive === '' || date===null){
              alert("All Fields are Necessary")
            }
            else {
              setIsLoading(true)
              fetchFlightDetails();
            }
          }}
        >
          Search
        </button>
      </form>
      <div className="compiled">
        <div className="flightHeading">
          <h3>Departure</h3>
          <h3>Arrival</h3>
          <h3>Airline</h3>
          <h3>Travel Time</h3>
          <h3>Stops</h3>
          <h3>Price</h3>
          
        </div>
        {flightData.length > 0 ? (
          flightData.map((item, index) => (
            <div key={index} className="flightsData">
              <p>{item.legs[0].departure.split("T")[1]}</p>
              <p>{item.legs[0].arrival.split("T")[1]}</p>
              <div className="airlines">
              <p>{item.legs[0].carriers.marketing[0].name}</p>
              <p>{`${item.legs[0].origin.id}-${item.legs[0].destination.id}`}</p>
              </div>
              <p>{convertMinutesToHours(item.legs[0].durationInMinutes)}</p>
              <p>{item.legs[0].stopCount}</p>
              <p>{item.price.formatted+'$'}</p>
            
            </div>
          ))
        ) : (isLoading ? <h1>Loading...</h1>:<h1>No Data to Show</h1>)
      }
      </div>
    </>
  );
};

export default App;
