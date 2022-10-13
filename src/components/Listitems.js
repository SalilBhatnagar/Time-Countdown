import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Listitems(props){
  const handleClick=(ShowData)=>{
    props.handle_Components(ShowData);
    }
  return(
  <>
    {/* <ListItemButton onClick={()=>handleClick(0)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Design" />
    </ListItemButton> */}

    <ListItemButton onClick={()=>handleClick(1)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Duration" />
    </ListItemButton>
  </>
  )
}

