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

interface CategoryDistributionChartProps {
  data: { name: string; value: number }[];
}

export function CategoryDistributionChart({
  data,
}: CategoryDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${String(name ?? "")} (${((percent ?? 0) * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
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
      </CardContent>
    </Card>
  );
}
