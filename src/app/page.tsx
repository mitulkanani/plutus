import Picks from "@/components/Picks/Picks";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/system";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <Picks />
      </NextUIProvider>
    </>
  );
}
