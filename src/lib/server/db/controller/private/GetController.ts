import { client } from '../../config/postgres.config';

const readNonSharedBlogs = async () => {
    try {
        await client.connect();
        const query = `SELECT (id, title, description, thumbnail, created_at, edited_at) FROM blogs WHERE shared = false`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readNonSharedProjects = async () => {
    try {
        await client.connect();
        const query = `SELECT (id, title, description, thumbnail, created_at, edited_at) FROM projects WHERE shared = false`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readNonSharedComments = async () => {
    try {
        await client.connect();
        const query = `SELECT * FROM comments WHERE shared = false`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

export { readNonSharedBlogs, readNonSharedProjects, readNonSharedComments };
