import { Directus } from "@directus/sdk";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const database = process.env.DIRECTUS_URL ? process.env.DIRECTUS_URL : 'https://';
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:flex-col">
      <Image
        src={'https://static.criptomaniacos.io/logo-cm-preto-branco.png'}
        height={200}
        width={200}
        alt="Criptomaníacos logo"
      />
      <h1 className="font-Sora text-gray text-2xl py-4">Encurtador de URL interno.</h1>
      <Link
        href={database} legacyBehavior>
        <a className="font-Sora text-purple text-xl hover:text-gray  hover:transition-all">Directus</a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const directusPublic = new Directus(process.env.DIRECTUS_URL!);
  const { data } = await directusPublic.items(process.env.DIRECTUS_COLLECTION!).readByQuery({
    fields: ["id", "url", "status"],
  });

  return {
    props: {
      urls: data,
    },
  };
}