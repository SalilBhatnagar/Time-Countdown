import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/list";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Listitems from "../components/Listitems";
import Ticker from "../components/Ticker";
import DesignTemplet from "../components/DesignTemplet";
import Duration from "../components/Duration";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

//context Hook
import contextDate from "./../context/modifyDateContext";
//import Template from "../Component/Template";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(true);
  const [ShowComponents, setComponet] = useState();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleComponent = async (ShowData) => {
    // eslint-disable-next-line default-case
    switch (ShowData) {
      case 0:
        setComponet(<DesignTemplet />);
        break;

      case 1:
        setComponet(
          <Duration
            tickerSetting={props.tickerSetting}
            setTickerSetting={props.setTickerSetting}
            countdownSettings={props.countdownSettings}
            setCountdownSettings={props.setCountdownSettings}
            countdownTimer={props.countdownTimer}
            setCountdownTimer={props.setCountdownTimer}
            eventName={props.eventName}
            setEventName={props.setEventName}
            countdownInfoMessage={props.countdownInfoMessage}
            setCountdownInfoMessage={props.setCountdownInfoMessage}
            modalVisibility={props.modalVisibility}
            setModalVisibility={props.setModalVisibility}
            initialCountdownSettings={props.initialCountdownSettings}
            initialCountdownTimer={props.initialCountdownTimer}
            clearCountdown={props.clearCountdown}
          />
        );
        break;
    }
  };

  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "10px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "2px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              id="dashboardcountdown"
            >
             Time Countdown
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Listitems handle_Components={handleComponent}></Listitems>
            {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              {/* Chart */}
              <Grid item xs={3} md={3} lg={3}>
                {/* <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 600,
                  }}
                >

                </Paper> */}
                {/* left said contain start */}
                <List>
                    {/* <Template /> */}
                    {ShowComponents}
                  </List>
                  {/* end left said contain */}
              </Grid>

              {/* Recent Deposits */}

              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 600,
                  }}
                >
                  {/* right said contain start */}

                  <Ticker
                    tickerSetting={props.tickerSetting}
                    setTickerSetting={props.setTickerSetting}
                    countdownSettings={props.countdownSettings}
                    setCountdownSettings={props.setCountdownSettings}
                    countdownTimer={props.countdownTimer}
                    setCountdownTimer={props.setCountdownTimer}
                    eventName={props.eventName}
                    setEventName={props.setEventName}
                    countdownInfoMessage={props.countdownInfoMessage}
                    setCountdownInfoMessage={props.setCountdownInfoMessage}
                    modalVisibility={props.modalVisibility}
                    setModalVisibility={props.setModalVisibility}
                    initialCountdownSettings={props.initialCountdownSettings}
                    initialCountdownTimer={props.initialCountdownTimer}
                  />

                  {/* end right said contain */}
                </Paper>
                {/* <Paper
                  sx={{
                    p: 2,
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 363,
                  }}
                >
                  test text
                </Paper> */}
              </Grid>
              {/* Recent Orders */}
              {/* <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                ></Paper>
              </Grid> */}
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
          <footer>Created by <a href="https://kapiva.in" target="_blank">kapiva</a> &copy; {new Date().getFullYear()}</footer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  
  const initialCountdownSettings = {
    eventNameValue: '',
    dateValue: '',
    timeValue: '',
    ampmValue: 'am',
    unixEndDate: ''
  };
  const initialCountdownTimer = {
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  };
  const [countdownSettings, setCountdownSettings] = useState(JSON.parse(localStorage.getItem('countdownDate')) || { ...initialCountdownSettings });
  const [countdownTimer, setCountdownTimer] = useState({ ...initialCountdownTimer });
  const [eventName, setEventName] = useState('');
  const [countdownInfoMessage, setCountdownInfoMessage] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [tickerSetting, setTickerSetting] = useState({
    event: "",
    date: "",
    time: "",
    ampm: "",
    submitData : false,
    cancelUpdate: false,
  });
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

  return (
    <contextDate.Provider
      value={{ tickerSetting, setTickerSetting, test: Math.random() }}
    >
      <DashboardContent
        tickerSetting={tickerSetting}
        setTickerSetting={setTickerSetting}
        countdownSettings={countdownSettings}
        setCountdownSettings={setCountdownSettings}
        countdownTimer={countdownTimer}
        setCountdownTimer={setCountdownTimer}
        eventName={eventName}
        setEventName={setEventName}
        countdownInfoMessage={countdownInfoMessage}
        setCountdownInfoMessage={setCountdownInfoMessage}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        initialCountdownSettings={initialCountdownSettings}
        initialCountdownTimer={initialCountdownTimer}
        clearCountdown={clearCountdown}
      />
    </contextDate.Provider>
  );
}
