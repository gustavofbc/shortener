import { Directus } from "@directus/sdk";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:flex-col">
      <Image
        src={'https://static.criptomaniacos.io/logo-cm-preto-branco.png'}
        height={200}
        width={200}
        alt="Criptomaníacos logo"
      />
      <h1 className="font-Sora text-gray text-2xl py-4">Encurtador de URL's interno.</h1>
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