import React,{useState, useEffect} from 'react';
import moment from 'moment';
import { GlobalStyles } from "../components/styles/Global";
import { Header } from "../components/styles/Header.styled";
import { Footer } from "../components/styles/Footer.styled";

import {
  ThemeContainer,
  ThemeButton,
} from "../components/styles/ThemeSwitching.styled";
import { ThemeProvider } from "styled-components";
import {
  light,
  dark,
  blue,
  green,
  brown,
  pink,
} from "../components/styles/Theme.styled";


const Countdown = ({ countdownTimer, unixEndDate, eventName }) => {
  const [selectedTheme, setSelectedTheme] = useState(light);

  // react hook to get the theme selected by the user that is saved in local storage
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);

  // function to handle user theme selection on click and save it to local storage
  const HandleThemeChange = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("current-theme", JSON.stringify(theme));
  };
  return (
<>
<ThemeProvider theme={selectedTheme}>
      <div className="App">
        <GlobalStyles />
        {/* <Header>Time Countdown</Header> */}
        <div className='div-countdown-heading'>Countdown</div>
         <br/><hr/><br/>
        <ThemeContainer>
          {/* <span>Themes: </span> */}
          <ThemeButton
            className={`light ${selectedTheme === light ? "active" : ""}`}
            onClick={() => HandleThemeChange(light)}></ThemeButton>
          <ThemeButton
            className={`dark ${selectedTheme === dark ? "active" : ""}`}
            onClick={() => HandleThemeChange(dark)}></ThemeButton>
          <ThemeButton
            className={`blue ${selectedTheme === blue ? "active" : ""}`}
            onClick={() => HandleThemeChange(blue)}></ThemeButton>
          <ThemeButton
            className={`green ${selectedTheme === green ? "active" : ""}`}
            onClick={() => HandleThemeChange(green)}></ThemeButton>
          <ThemeButton
            className={`brown ${selectedTheme === brown ? "active" : ""}`}
            onClick={() => HandleThemeChange(brown)}></ThemeButton>
          <ThemeButton
            className={`pink ${selectedTheme === pink ? "active" : ""}`}
            onClick={() => HandleThemeChange(pink)}></ThemeButton>
        </ThemeContainer>
        {/* <div id="timer">
          <div>
          {countdownTimer.days} 
          <span>day</span>
          </div>
          <div>
          {countdownTimer.hours}
          <span>Hours</span>
          </div>
          <div>
          {countdownTimer.mins}
          <span>Minutes</span>
          </div>
          <div>
          {countdownTimer.secs}
          <span>Seconds</span>

          </div>
          </div> */}

         <div className='div-footer-timecounter'>
            <Footer>
            <div className='span-time-counter'>
            <ul>
                <li className='li-timerCounter'>
                {countdownTimer.days}<br/>
                <span className='span-count1'>day</span>
                </li>
            </ul>
            </div>
            </Footer>
            &nbsp; &nbsp;
            <Footer>
            <div className='span-time-counter'>
            <ul>
                <li>
                {countdownTimer.hours}<br/>
                <span className='span-count2'>Hours</span>
                </li>
            </ul>
            </div>
            </Footer>
            &nbsp; &nbsp;
            <Footer>
            <div className='span-time-counter'>
            <ul>
                <li>
                {countdownTimer.mins}<br/>
                <span className='span-count3'>Minutes</span>
                </li>
            </ul>
            </div>
            </Footer>
            &nbsp; &nbsp;
            <Footer>
            <div className='span-time-counter'>
            <ul>
                <li>
                {countdownTimer.secs}<br/>
                <span className='span-count4'>Seconds</span>
                </li>
            </ul>
            </div>
            </Footer>
         </div>
       
        <p className='p-discription'>Counting down to {eventName} on {moment.unix(unixEndDate).format('dddd, MMMM Do, YYYY | h:mm A')}</p>
    
      </div>
    </ThemeProvider>
</>
  );
}

export default Countdown;