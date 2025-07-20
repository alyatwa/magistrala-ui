import {
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconBell,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Sensor Errors */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Sensor Errors</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5
          </CardTitle>
          <CardAction>
            <Badge variant="destructive">
              <IconAlertTriangle />
              +2 today
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            2 new errors detected <IconAlertTriangle className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Check sensor logs for details
          </div>
        </CardFooter>
      </Card>
      {/* Active Alarms */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Alarms</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconBell />1 critical
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            1 critical, 2 warning <IconBell className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Immediate attention required
          </div>
        </CardFooter>
      </Card>
      {/* Online Sensors */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Online Sensors</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            120
          </CardTitle>
          <CardAction>
            <Badge variant="default">
              <IconCheck />
              98%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Most sensors operational <IconCheck className="size-4" />
          </div>
          <div className="text-muted-foreground">2 sensors offline</div>
        </CardFooter>
      </Card>
      {/* System Health */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>System Health</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Good
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconX />1 issue
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Minor issue detected <IconX className="size-4" />
          </div>
          <div className="text-muted-foreground">Review diagnostics</div>
        </CardFooter>
      </Card>
    </div>
  );
}
