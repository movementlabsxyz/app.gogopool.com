import { PageHead } from "@/common/components/PageHead";
import { Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="h-full">
      <PageHead
        append={false}
        description="Home page description"
        name="Home"
      />
      <section className="grid place-content-center h-full">
        <span>Hello world</span>
        <Button>Connect Button</Button>
      </section>
    </div>
  );
}
