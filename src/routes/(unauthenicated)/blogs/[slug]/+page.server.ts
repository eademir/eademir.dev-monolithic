import { error } from '@sveltejs/kit';
//import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';


async function getPostFromDatabase(slug: string) {
    return {
        title: slug,
        content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
        image: 'https://picsum.photos/seed/picsum/500/500',
        imageCaption: 'This is a random image from picsum.photosasdada'
    };
}

export const load: PageServerLoad = async ({ params }) => {
    const post = await getPostFromDatabase(params.slug);

    if (post) {
        return post;
    }

    error(404, 'Not found');
};