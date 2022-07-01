import { useState, useEffect } from "react";
import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import { get } from "../../Api";

const YearlyChecklist = () => {
  const year = new Date().getFullYear();
  const [data, setData] = useState();
  const LoadYearlyData = async () => {
    try {
      const colorMap: any = { green: 1, yellow: 2, red: 3 };
      const res = await get("checklist/yearly");
      interface checklist {
        level: string;
        date: string;
        count?: number;
      }
      const yearlyData = await res.data.map((element: checklist) => {
        const level = element.level;
        element.count = colorMap[level];
        return element;
      });
      setData(yearlyData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadYearlyData();
  }, []);

  return (
    <HeatMap
      value={data}
      width={1050}
      height={200}
      space={5}
      startDate={new Date(`${year}/01/01`)}
      endDate={new Date(`${year}/12/31`)}
      legendCellSize={0}
      rectSize={14}
      rectProps={{
        rx: 3,
      }}
      rectRender={(props: any, data: any) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip key={props.key} placement="top" content={`${data.date}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
      panelColors={{
        0: "#EBEDF0",
        2: "#70df95",
        3: "#fef08a",
        4: "#fca5a5",
      }}
    />
  );
};

export default YearlyChecklist;
