import { getAlarms } from "../actions";
import { AlarmsTable } from "../components/AlarmsTable";

export default function AlarmsPage() {
  const alarms = getAlarms();
  return (
    <>
      <AlarmsTable alarms={alarms} />
    </>
  );
}
