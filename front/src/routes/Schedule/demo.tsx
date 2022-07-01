import { useEffect } from "react";
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
  const LoadYearlyData = async () => {
    try {
      const res = await get("checklist/yearly");
      console.log("#res", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadYearlyData();
  }, []);

  return (
    <HeatMap
      value={value}
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
    />
  );
};

export default Demo;
