import Image from "next/image";
export default function Portrait({ degree }: { degree: string }) {
  return (
    <figure className="editorial-portrait">
      <div>
        <Image
          src="/assets/art/saroj-editorial.webp"
          alt="Saroj Prasad Mainali, full-stack engineer from Kathmandu, Nepal"
          width={1063}
          height={1480}
          priority
          sizes="(max-width: 1024px) 88vw, 384px"
        />
      </div>
      <figcaption>
        <span>SAROJ PRASAD MAINALI</span>
        <small>{degree}</small>
      </figcaption>
    </figure>
  );
}
