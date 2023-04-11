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
                )
                }
                <h1>Página não encontrada</h1>
            </Head>
        </div>
    );
}

export async function getStaticPaths() {
    const { data } = await directusPublic.items("urls").readByQuery({
        filter: {
            url: {
                _neq: 'zzzzz'
            }
        },
        limit: 100,
    }) as LinksProps;
    console.log('passou:');

    if (!data) {
        return {
            notFound: true,
        }
    }

    const paths = data.map((item) => ({
        params: { slug: item.id },
    }));

    console.log('olha aqui: ' + paths);

    return { paths, fallback: true };

}

export async function getStaticProps(context: any) {
    const data = await directusPublic.items('urls').readOne(context.params.slug);
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

