import { ResponsiveCalendar } from "@nivo/calendar";
import { calendarData } from "./yearlyData";
import "./Yearly.css";
import React from "react";

const Yearly: React.FC = () => {
  return (
    <div id="Yearly">
      <h2>Nivo Calendar</h2>

      <ResponsiveCalendar
        data={calendarData}
        from="2022-01-08"
        to="2022-08-09"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

export default Yearly;
