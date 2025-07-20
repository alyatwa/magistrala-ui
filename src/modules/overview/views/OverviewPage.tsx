import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import { SectionCards } from "@/components/section-cards";
import { OverviewTable } from "@/modules/overview/components/overview-table";
import { SensorCharts } from "../components/sensor-charts";

export const OverviewPage = () => {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <SensorCharts />
        <ChartAreaInteractive />
      </div>
      <OverviewTable />
    </>
  );
};
