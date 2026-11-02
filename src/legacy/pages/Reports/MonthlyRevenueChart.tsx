import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyRevenueChartProps {
  data: { month: string; revenue: number }[];
}

export function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="revenue" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
