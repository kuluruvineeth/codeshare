import Image from "next/image";

export default function Logo() {
  return <Image height={34} width={34} src="/next.svg" alt="logo" priority />;
}
