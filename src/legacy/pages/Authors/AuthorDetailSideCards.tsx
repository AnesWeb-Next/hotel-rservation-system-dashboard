import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuthorDetailSideCardsProps {
  totalBooks: number;
  availableCount: number;
}

export function AuthorDetailSideCards({ totalBooks, availableCount }: AuthorDetailSideCardsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Books</span>
            <Badge variant="secondary" className="text-lg">{totalBooks}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Available Books</span>
            <Badge variant="outline" className="text-lg">{availableCount}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
