import directusPublic from '../../services/directus';
import Head from "next/head"

interface LinksProps {
    data: Array<{
        url: string;
        id: string;
        active: boolean;
    }>
}

interface slugProps {
    data: {
        url: string
    }
}

export default function redirectPage(props: slugProps) {

    return (
        <div>
            <Head>
                <title>redirect page</title>
                {props.data && props.data.url && (
                    <meta httpEquiv="refresh" content={`0; URL='${props.data.url}'`} />
                )}
                <div className="bg-black min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:flex-col">
                    <h1 className="font-Sora text-gray text-2xl py-4">Página não encontrada...</h1>
                </div>
            </Head>
        </div>
    );
}

export async function getStaticPaths() {
    const { data } = await directusPublic.items(process.env.DIRECTUS_COLLECTION!).readByQuery({
        filter: {
            url: {
                _neq: 'zzzzz'
            }
        },
        limit: 100,
    }) as LinksProps;

    if (!data) {
        return {
            notFound: true,
        }
    }

    const paths = data.map((item) => ({
        params: { slug: item.id },
    }));

    return { paths, fallback: true };

}

export async function getStaticProps(context: any) {
    const data = await directusPublic.items(process.env.DIRECTUS_COLLECTION!).readOne(context.params.slug);
    if (!data) {
        return {
            notFound: true,
            revalidate: 60,
        };
    }

    return {
        props: { data },
        revalidate: 60,
    };

}