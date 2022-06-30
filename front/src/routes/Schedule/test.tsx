import * as React from "react";
import CalendarHeatmap from "react-calendar-heatmap";

const Yearly: React.FC = () => {
  return <CalendarHeatmap endDate={new Date("2016-04-01")} numDays={100} values={[{ date: "2016-01-01" }, { date: "2016-01-22" }, { date: "2016-01-30" }]} />;
};

export default Yearly;
