import AppLayout from "@/components/layout/app-layout";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

export default function Home() {
  return (
    <AppLayout>
      <div className="mt-10">
          <Card>
            <Card.Header>
              <Card.Title>Hello World</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>This is a test card</p>
              <Button>Click me</Button>
            </Card.Content>
          </Card>
      </div>
    </AppLayout>
  );
}
