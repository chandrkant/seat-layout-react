import React, { useState, useEffect } from "react";
import "./mobile.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function SeatLayout(props) {
  const [seats, setSeats] = useState([]);
  const [lower, setLower] = useState([]);
  const [upper, setUpper] = useState([]);
  const [tripID, setTripID] = useState(props.match.params.trip_id);
  const [showLower, setShowLower] = useState(true)
  const getLayout = async () => {
    setTripID(props.match.params.trip_id);
    const data = await fetch(
      `https://new.railyatri.in/v2/bus-seat-layout-json?trip_id=${props.match.params.trip_id}&no_of_passengers=1&operator_id=28028&v_code=176&device_type_id=4&provider_id=5&is_new_reduce_basefare=1&request_src=mweb&user_id=-1578892000`
    );
    const tripData = await data.json();
    if(tripID.includes('MTS') || tripID.includes('ITS')){
      setUpper(tripData.upper.reverse());
    }else{
      setUpper(tripData.upper)
    }
    if(tripID.includes('ITS') ){
      setLower(tripData.lower.reverse())
    }else{
      setLower(tripData.lower)
    }
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
            {lower.map((row,index) => (
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
            {upper.map((row,index) => (
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
