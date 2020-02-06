import React, { useState, useEffect, useReducer } from "react";
import "./mobile.css";
import 'bootstrap/dist/css/bootstrap.css';
const init = (props)=>{
  return {
    lower: [],
    upper: [],
    tripId: props.match.params.trip_id,
    showLower: true,
    seats: [],
    marginL: 0,
    marginU: 0,
  }
}

const reducer = (state,action) => {
  switch (action.type) {
    case 'SET_LOWER':
      return {...state,lower: action.value}
    case 'SET_UPPER':
      return {...state,upper: action.value}
    case 'SET_BERTH':
      return {...state, showLower: action.value}  
    case "MRGINL":
      return {...state, marginL: action.value}
    case "MRGINU":
      return {...state, marginU: action.value}   
    default:
     return state;
  }
}
export default function SeatLayout(props) {
  const [state,dispetch] = useReducer(reducer,props,init);
  const getLayout = async () => {
    const data = await fetch(
      `https://new.railyatri.in/v2/bus-seat-layout-json?trip_id=${state.tripId}&no_of_passengers=1&operator_id=28028&v_code=176&device_type_id=4&provider_id=5&is_new_reduce_basefare=1&request_src=mweb&user_id=-1578892000`
    );
    const tripData = await data.json();
    if(typeof tripData.upper!== 'undefined'){
      if(state.tripID && (state.tripID.includes('MTS') || state.tripID.includes('ITS'))){
        dispetch({type: 'SET_UPPER', value: tripData.upper.reverse()})
      }else{
        dispetch({type: 'SET_UPPER', value: tripData.upper})
      }
    }
    if(state.tripID && state.tripID.includes('ITS') ){
      dispetch({type: 'SET_LOWER', value: tripData.lower.reverse()})
      
    }else{
      dispetch({type: 'SET_LOWER', value: tripData.lower})
      
    }
    
  };
  const seatSelectedSeats = seat => {
    console.log("====================================");
    console.table(seat);
    console.log("====================================");
  };

  const setWidth = () => {
    var mrl,mru = 0;
    if(state.lower.length>0){
       mrl = (document.getElementById("mobile_lower").querySelectorAll(".seats_row")[0].offsetWidth
      -document.getElementById("mobile_lower").querySelectorAll(".seats_row_spc").length*45)/2;
      dispetch({type: "MRGINL",value: mrl});
    }
    if(state.upper.length>0){
      mru = (document.getElementById("mobile_upper").querySelectorAll(".seats_row")[0].offsetWidth
      -document.getElementById("mobile_upper").querySelectorAll(".seats_row_spc").length*45)/2;
      dispetch({type: "MRGINU",value: mru});
     
    }
    
  }
  useEffect(() => {
    getLayout();
  }, []);
  useEffect(() =>{
    setWidth();
  },[state.lower,state.upper])
  
  return (
    <div className ="tab-content" >
      <div id="bus-leftside"></div>
      <div id="bus-rightside"></div>
      <button onClick={()=>dispetch({type: 'SET_BERTH', value: true})}>Lower</button>
      <button onClick={()=>dispetch({type: 'SET_BERTH', value: false})} >Upper</button>
      <img id="bus-front" className="img-responsive" src="https://rytest.storage.googleapis.com/assets/bus_web/seat-layout/bus-dashboard-8280a5ff3fc4e0916aff60d59d3b163e9586070bbafe06071a0f2383d9a34718.png" alt="Bus dashboard"/>
      <img id="loading" className="steering" src="https://rytest.storage.googleapis.com/assets/bus_web/seat-layout/bus-steering-9a6643844547093c3ee12395a4dc1335552584b3fd83a30ac48f4b704f38f0cb.png" alt="Bus steering"></img>
      <div id="mobile_lower" style={{ display: ( state.showLower ? 'block' : 'none')}}>
        <div className="seats_row">
          <div className="temp-lower" style={{marginLeft: `${state.marginL}px`}}>
            {(state.lower|| []).map((row,index) => (
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
      <div id="mobile_upper" style={{display: (!state.showLower ? 'block' : 'none')}}>
        <div className="seats_row">
          <div className="temp-upper" style={{marginLeft: `${state.marginU}px`}}>
            {(state.upper || []).map((row,index) => (
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
      <img id="bus-end" className="img-responsive" src="https://rytest.storage.googleapis.com/assets/bus_web/seat-layout/bus-tailend-de06ba9d8e6c96c555d4da707543acf2415b287b65a1ef25c6c05a9a9d07768c.png" alt="Bus tailend"></img>
    </div>
  );
}
