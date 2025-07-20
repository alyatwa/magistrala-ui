import { ChartAreaInteractive } from "@/modules/overview/components/chart-area-interactive";

import { SectionCards } from "@/modules/overview/components/section-cards";
import { OverviewTable } from "@/modules/overview/components/overview-table";
import { SensorCharts } from "../components/sensor-charts";

export const OverviewPage = () => {
  return (
    <>
      <SectionCards />
      <div className="px-4 space-y-4  lg:px-6">
        <SensorCharts />
        <ChartAreaInteractive />
      </div>
      <OverviewTable />
    </>
  );
};
