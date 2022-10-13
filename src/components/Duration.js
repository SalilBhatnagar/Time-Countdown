import React from "react";
import moment from 'moment';
import ccDate from "../context/modifyDateContext";
import Swal from 'sweetalert2'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';  

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';


export default function Duration({tickerSetting, setTickerSetting,countdownSettings,setCountdownSettings,countdownTimer,
  setCountdownTimer,eventName,setEventName,countdownInfoMessage, setCountdownInfoMessage,
  modalVisibility,setModalVisibility,initialCountdownSettings, initialCountdownTimer}) {
  const [val, setVal]= React.useState();
  const [settingsFormErrorMessage, setSettingsFormErrorMessage] = React.useState(false);
  const contextDate = React.useContext(ccDate);
  const [tickerpass, setTickerpass] = React.useState({
    event:"",
    date : "",
    time:"",
    ampm:"",

  });
  const modifyDate = React.useContext(ccDate);
  function clearCountdown() {

    if (!countdownSettings.unixEndDate) {
      alert('No countdown has been set. Please click the Settings button to start a new countdown.');
    }
    else {

        setCountdownInfoMessage('Countdown cleared. Click the Settings button to start a new countdown.');
        setCountdownSettings({ ...initialCountdownSettings });
        setCountdownTimer({ ...initialCountdownTimer });
      
    }
  }
  function handleSubmit() {
    
    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    ></Box>
    console.log("handelsubmit Called");
   // event.preventDefault();
    // const eventNameValue = countdownSettings.eventNameValue.trim();
    const eventNameValue = modifyDate.tickerSetting.event.trim();
    // const dateValue = countdownSettings.dateValue.trim();
    const dateValue = modifyDate.tickerSetting.date.trim();
    // let timeValue = countdownSettings.timeValue.trim();
    let timeValue = modifyDate.tickerSetting.time.trim();
    // let ampmValue = countdownSettings.ampmValue;
    let ampmValue = modifyDate.tickerSetting.ampm.trim();
    let unixEndDate;
    console.log(timeValue);
    console.log(ampmValue);

    if (!eventNameValue) {
      setSettingsFormErrorMessage('The event name is required');
    }
    else if (!moment(dateValue, 'MM-DD-YYYY', true).isValid()) {
      setSettingsFormErrorMessage('Date input must be a valid date set in MM-DD-YYYY format.');
    }
    else if (timeValue && !moment(timeValue, 'hh:mm', true).isValid()) {
      setSettingsFormErrorMessage('Time input must be valid according to the 12-hour clock set in hh:mm format.');
    }
    else {

      if (!timeValue) {
        timeValue = '12:00';
        ampmValue = 'am';
      }

      unixEndDate = Number(moment(`${dateValue} ${timeValue} ${ampmValue}`, 'MM-DD-YYYY hh:mm A').format('X'));
      
      if ((unixEndDate - moment().format('X')) < 1) {
        setSettingsFormErrorMessage('The countdown date must be set to a future date.');
      }
      else {
        //server work around
        fetch('https://fxi9cr.sse.codesandbox.io/addeventdetail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventName: eventNameValue,
        eventDate: dateValue,
        eventTime: timeValue,
        eventampm: ampmValue
    })
    }).then(d=>d.json()).then(dd=>{
      console.log("=>server response",dd);

    }).catch(err=>console.log("=>server response",err));
    
    Swal.fire(
      'Update Time',
      'You clicked the button!',
      'success'
    )
        setSettingsFormErrorMessage(false)
         console.log("===> this is the final value to set", modifyDate.tickerSetting,eventNameValue, dateValue, timeValue, ampmValue,unixEndDate);
        setCountdownSettings(prevCountdownSettings => {
          return {
            ...prevCountdownSettings,
            eventNameValue,
            dateValue,
            timeValue,
            ampmValue,
            unixEndDate
          };
        });
        setEventName(eventNameValue);
        setModalVisibility(false);
      }
    }
  }



  React.useEffect(()=>{
    console.log(" this is the new value",JSON.stringify(contextDate.tickerSetting))
  },[contextDate])



  function updateTime(data){
    let update, cancel;
    if(data === "update"){ update = true ; cancel = false; handleSubmit()}
    if(data === "cancel"){ update = false ; cancel = true; setModalVisibility(false)}
    contextDate.setTickerSetting({...contextDate.tickerSetting, submitData : update, cancelUpdate : cancel});
    
  }
  return (
    <div className="div-duration-container">
      <h1 className="h1-duration-heading">Duration
      </h1>
   
      {/* <hr />   <button onClick={()=>clearCountdown()}>Clear</button>  */}

      <br />
      <TextField  placeholder="Enter your event name"
        name="eventname" value={contextDate.tickerSetting.event} onChange={(e)=>contextDate.setTickerSetting({...contextDate.tickerSetting, event:e.target.value})}
      />
      {/* <input name="eventname" value={contextDate.tickerSetting.event} onChange={(e)=>contextDate.setTickerSetting({...contextDate.tickerSetting, event:e.target.value})} /> */}
      <br /><br/>
      <TextField  placeholder="Enter your date"
        name="date" value={contextDate.tickerSetting.date} onChange={(e)=>contextDate.setTickerSetting({...contextDate.tickerSetting, date:e.target.value})}
      />
      {/* Date :<input name="date" value={contextDate.tickerSetting.date} onChange={(e)=>contextDate.setTickerSetting({...contextDate.tickerSetting, date:e.target.value})} /> */}
      <br /><br/>
      <TextField  placeholder="Enter your time"
        name="time" value={contextDate.tickerSetting.time} onChange={(e)=>contextDate.setTickerSetting({...contextDate.tickerSetting, time:e.target.value})}
      />
      {/* Time :<input name="time" value={contextDate.tickerSetting.time} onChange={(e)=>contextDate.setTickerSetting({...contextDate.tickerSetting, time:e.target.value})} /> */}
      <br /> <br/>
      <Select
         
          value={contextDate.tickerSetting.ampm}
          onChange={(e)=>{contextDate.setTickerSetting({...contextDate.tickerSetting, ampm:e.target.value})}}
          className="selectTime"
          placeholder="Enter you select time"
        >
          <MenuItem value="">
            <em>Nonewewewe</em>
          </MenuItem>
          <MenuItem value="am">AM</MenuItem>
          <MenuItem value="pm">PM</MenuItem>
        </Select>


      {/* <select onChange={(e)=>{contextDate.setTickerSetting({...contextDate.tickerSetting, ampm:e.target.value});
      console.log("===>point ampm", e.target.value)}}>
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select> */}
      <br />

      <Button variant="contained" onClick={()=>updateTime("update")} id="button1">Update Time</Button>

      &nbsp;&nbsp;
      <Button variant="contained" color="error" onClick={()=>updateTime("cancel")} id="button2">Clear Update</Button>
      <br/><br/>
      {settingsFormErrorMessage ? <p className="message error-message" style={{color : "red"}}><span className="fa fa-exclamation-circle fa-lg fa-fw" ></span> {settingsFormErrorMessage}</p>: null}
    </div>
  );
}
