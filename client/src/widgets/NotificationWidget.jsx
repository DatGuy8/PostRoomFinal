import { useEffect } from "react"
import axios from "axios";
import WidgetBox from "components/WidgetBox";

const NotificationWidget = () => {
  useEffect(()=>{
    console.log("running");
  })

  return (
    <WidgetBox m="2rem 6% 0 6%">Notifications</WidgetBox>
  )
}

export default NotificationWidget