import React, { useState, useEffect } from "react";
import "./mobile.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function SeatLayout(props) {
  const [seats, setSeats] = useState([]);
  const [tripDetails, setTripDetails] = useState({ lower: [], upper: [] });
  const [tripID, setTripID] = useState("");
  const [showLower, setShowLower] = useState(true)
  // setTripID(props.match.params.trip_id);
  const getLayout = async () => {
    console.log('====================================');
    console.log(tripID);
    console.log('====================================');
    const data = await fetch(
      `https://new.railyatri.in/v2/bus-seat-layout-json?trip_id=${props.match.params.trip_id}&no_of_passengers=1&operator_id=28028&v_code=176&device_type_id=4&provider_id=5&is_new_reduce_basefare=1&request_src=mweb&user_id=-1578892000`
    );
    const tripData = await data.json();
    setTripDetails(tripData);
  };
  const seatSelectedSeats = seat => {
    console.log("====================================");
    console.table(seat);
    console.log("====================================");
  };
  useEffect(() => {
    getLayout();
  }, []);
  return (
    <div>
      <button onClick={()=>setShowLower(true)} >Lower</button>
      <button onClick={()=>setShowLower(false)} >Upper</button>
      <div id="mobile_lower" style={{ display: ( showLower ? 'block' : 'none')}}>
        <div className="seats_row">
          <div className="temp-lower">
            {(tripDetails.lower ? tripDetails.lower.reverse() : []).map((row,index) => (
              <div className="col-xs-2 seats_row_spc" key={'lower_'+index}>
                {row.map(seat => (
                  <div className="seat-wrap" key={seat.name}>
                    <div
                      className={seat.css_1}
                      
                      onClick={() => seatSelectedSeats(seat)}
                    >
                      <div className={seat.css_2}>
                        {seat.name}
                        <span className={seat.span_1}></span>
                        <span className={seat.span_2}></span>
                        <span className={seat.span_2}></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="mobile_upper" style={{display: (!showLower ? 'block' : 'none')}}>
        <div className="seats_row">
          <div className="temp-upper">
            {(tripDetails.upper ? tripDetails.upper.reverse() : []).map((row,index) => (
              <div className="col-xs-2 seats_row_spc" key={'upper_'+index}>
                {row.map(seat => (
                  <div className="seat-wrap" key={seat.name}>
                    <div
                      className={seat.css_1}
                      onClick={() => seatSelectedSeats(seat)}
                    >
                      <div className={seat.css_2}>
                        {seat.name}
                        <span className={seat.span_1}></span>
                        <span className={seat.span_2}></span>
                        <span className={seat.span_2}></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
