import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7c43",
];

interface BookAvailabilityChartProps {
  data: { name: string; value: number }[];
}

export function BookAvailabilityChart({ data }: BookAvailabilityChartProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Book Availability Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8">
          <ResponsiveContainer width="50%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS.at(index % COLORS.length)}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: COLORS.at(index % COLORS.length),
                  }}
                />
                <span className="text-sm">
                  {entry.name}: <strong>{entry.value}</strong> books
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
