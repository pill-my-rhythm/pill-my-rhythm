import { useState, useEffect } from "react";
import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import { get } from "../../Api";

const value = [
  { date: "2022/01/11", count: 2 },
  ...[...Array(17)].map((_, idx) => ({ date: `2022/01/${idx + 10}`, count: idx })),
  ...[...Array(17)].map((_, idx) => ({ date: `2022/02/${idx + 10}`, count: idx })),
  { date: "2022/04/12", count: 2 },
  { date: "2022/05/01", count: 5 },
  { date: "2022/05/02", count: 5 },
  { date: "2022/05/03", count: 1 },
  { date: "2022/05/04", count: 11 },
  { date: "2022/05/08", count: 32 },
];

const Demo = () => {
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
      // const yearlyData = res.data;
      console.log("#res", yearlyData);
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
      width={1000}
      height={200}
      space={3}
      startDate={new Date("2022/01/01")}
      endDate={new Date("2022/12/31")}
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
        2: "#8fe4a6",
        3: "#fef08a",
        4: "#fca5a5",
        // 20: "#ad001d",
        // 30: "#000",
      }}
    />
  );
};

export default Demo;
