import React, { useState, useEffect } from 'react';
import moment from 'moment';
import SettingsModal from './settings-modal';
import Countdown from './countdown';
import InfoMessage from './info-message';
import contextModifyDate  from '../context/modifyDateContext'


const Ticker = ({tickerSetting, setTickerSetting,countdownSettings,setCountdownSettings,countdownTimer,
  setCountdownTimer,eventName,setEventName,countdownInfoMessage, setCountdownInfoMessage,
  modalVisibility,setModalVisibility,initialCountdownSettings, initialCountdownTimer}) => {

  // const initialCountdownSettings = {
  //   eventNameValue: '',
  //   dateValue: '',
  //   timeValue: '',
  //   ampmValue: 'am',
  //   unixEndDate: ''
  // };
  // const initialCountdownTimer = {
  //   days: '',
  //   hours: '',
  //   minutes: '',
  //   seconds: ''
  // };
const modifyDate = React.useContext(contextModifyDate);
//   const [countdownSettings, setCountdownSettings] = useState(JSON.parse(localStorage.getItem('countdownDate')) || { ...initialCountdownSettings });
//   const [countdownTimer, setCountdownTimer] = useState({ ...initialCountdownTimer });
//   const [eventName, setEventName] = useState('');
//   const [countdownInfoMessage, setCountdownInfoMessage] = useState('');
//   const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(()=>{
    console.log(countdownSettings,countdownTimer, eventName, countdownInfoMessage, modalVisibility, countdownSettings.unixEndDate )
  }, [countdownSettings,countdownTimer, eventName, countdownInfoMessage, modalVisibility])
  useEffect(() => {
    if (!countdownSettings.unixEndDate) setCountdownInfoMessage('Please set Event name and date to start countdown');

    window.addEventListener('click', event => {
      if (event.target.id === 'modal') setModalVisibility(false);
    });
  }, []);
  useEffect(()=>{
    console.log(" this is inside clear interval", modifyDate.tickerSetting.cancelUpdate)
    if(modifyDate.tickerSetting.cancelUpdate=== true){
      clearCountdown()
    }
  },[modifyDate])

  useEffect(() => {
    let timer = null;

    if (countdownSettings.unixEndDate) {
      timer = setInterval(() => playTimer(countdownSettings.unixEndDate), 1000);
    }
    localStorage.setItem('countdownDate', JSON.stringify(countdownSettings));

    return () => {
      clearInterval(timer);
      timer = null;
    }
  }, [countdownSettings.unixEndDate, eventName]);

  useEffect(() => {
    setCountdownSettings(JSON.parse(localStorage.getItem('countdownDate')) || { ...initialCountdownSettings });
  }, [modalVisibility]);

  function playTimer(currentUnixEndDate) {
    const distance = currentUnixEndDate - moment().format('X');

    if (distance > 0) {
      setCountdownTimer(prevCountdownTimer => {
        return {
          ...prevCountdownTimer,
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt(distance % (60 * 60 * 24) / (60 * 60), 10),
          mins: parseInt(distance % (60 * 60) / (60), 10),
          secs: parseInt(distance % 60, 10)
        };
      });
      setCountdownInfoMessage('');
    }
    else {
      setCountdownInfoMessage('Countdown ended. Click the Settings button to start a new countdown.');
      setCountdownSettings({ ...initialCountdownSettings });
      setCountdownTimer({ ...initialCountdownTimer });
      modifyDate.setTickerSetting({...modifyDate.tickerSetting, event: "",
      date: "",
      time: "",
      ampm: "",
      submitData : false,
      cancelUpdate: false,})
    }
  }

  function clearCountdown() {

    if (!countdownSettings.unixEndDate) {
      console.log('No countdown has been set. Please click the Settings button to start a new countdown.');
    }
    else {

        setCountdownInfoMessage('Countdown cleared. Click the Settings button to start a new countdown.');
        setCountdownSettings({ ...initialCountdownSettings });
        setCountdownTimer({ ...initialCountdownTimer });
      
    }
  }

  return (
    <React.Fragment>
      {/* <header>
        <h1 className="header-item">Countdown Timer</h1>
        <div className="button-group header-item">
          <button type="button" className="button header-button clear" onClick={() => clearCountdown()}>Clear</button>
          <button type="button" className="button header-button settings" onClick={() => setModalVisibility(true)}>Settings</button>
        </div>
      </header> */}
      <main>
        {modalVisibility && <SettingsModal setModalVisibility={setModalVisibility} countdownSettings={countdownSettings} setCountdownSettings={setCountdownSettings} setEventName={setEventName} />}
        {countdownSettings.unixEndDate ? <Countdown countdownTimer={countdownTimer} unixEndDate={countdownSettings.unixEndDate} eventName={eventName} /> : <InfoMessage countdownInfoMessage={countdownInfoMessage} />}
      </main>
      {/* <footer>Created by <a href="https://kapiva.in" target="_blank">kapiva</a> &copy; {new Date().getFullYear()}</footer> */}
    </React.Fragment>
  );
}

export default Ticker;