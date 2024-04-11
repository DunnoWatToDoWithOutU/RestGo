import { HomePage } from "@/components/HomePage/HomePage";
import Image from "next/image";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div>
      <Toaster expand={true} />
      <HomePage></HomePage>;
    </div>
  );
}
