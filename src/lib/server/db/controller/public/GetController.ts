import { client } from '../../config/postgres.config';

const readBlog = async (id: string) => {
    try {
        await client.connect();
        const query = `SELECT * FROM blogs WHERE id = '${id}'`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readUser = async (id: string) => {
    try {
        await client.connect();
        const query = `SELECT * FROM users WHERE id = '${id}'`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readComment = async (id: string) => {
    try {
        await client.connect();
        const query = `SELECT * FROM comments WHERE id = '${id}'`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readAbout = async (id: string) => {
    try {
        await client.connect();
        const query = `SELECT * FROM about WHERE id = '${id}'`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readProject = async (id: string) => {
    try {
        await client.connect();
        const query = `SELECT * FROM projects WHERE id = '${id}'`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readSharedBlogs = async (page: number, pageSize: number) => {
    try {
        await client.connect();
        const offset = (page - 1) * pageSize;
        const query = `SELECT (id, title, description, thumbnail, created_at, edited_at) FROM blogs WHERE shared = true LIMIT ${pageSize} OFFSET ${offset}`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readSharedComments = async () => {
    try {
        await client.connect();
        const query = `SELECT * FROM comments WHERE shared = true`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readContacts = async () => {
    try {
        await client.connect();
        const query = `SELECT * FROM contacts`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readSharedProjects = async () => {
    try {
        await client.connect();
        const query = `SELECT * FROM projects WHERE shared = true`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readTechClasses = async () => {
    try {
        await client.connect();
        const query = `SELECT * FROM tech_classes`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const readTechs = async () => {
    try {
        await client.connect();
        const query = `SELECT * FROM techs`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

export {
    readBlog,
    readUser,
    readComment,
    readAbout,
    readProject,
    readSharedBlogs,
    readSharedComments,
    readContacts,
    readSharedProjects,
    readTechClasses,
    readTechs,
};
