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

interface PopularBooksChartProps {
  data: { name: string; borrowed: number }[];
}

export function PopularBooksChart({ data }: PopularBooksChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Books</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="borrowed" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
