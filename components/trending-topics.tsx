import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function TrendingTopics() {
  return (
    <Card className="hover:bg-accent/5 transition-colors">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Tópicos em alta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Lista de tópicos em tendência */}
      </CardContent>
    </Card>
  );
}
