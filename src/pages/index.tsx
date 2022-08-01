import { useRouter } from "next/router";

import { Button } from "@/common/components/Button";
import { PageHead } from "@/common/components/PageHead";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-full">
      <PageHead
        append={false}
        description="Home page description"
        name="Home"
      />
      <section className="grid h-full place-content-center">
        <Button
          size="md"
          variant="primary"
          onClick={() => {
            router.push("/liquidStaking");
          }}
        >
          {" "}
          Liquid Staking{" "}
        </Button>
        <Button
          style={{
            marginTop: "20px",
          }}
          size="md"
          variant="secondary-outline"
          onClick={() => {
            router.push("/nodeOperator");
          }}
        >
          {" "}
          Node Operator{" "}
        </Button>
      </section>
    </div>
  );
}
