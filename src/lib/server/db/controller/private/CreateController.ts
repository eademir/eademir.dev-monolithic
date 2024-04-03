import { client } from '../../config/postgres.config';

const createBlog = async (
    title: string,
    content: string,
    createdBy: string,
    createdAt: Date,
    editedAt: Date,
    thumbnail: string,
    keywords: string,
    shared: boolean,
    images: string[]
) => {
    try {
        await client.connect();
        const query = `INSERT INTO blogs (title, content, created_by, created_at, edited_at, thumbnail, keywords, shared, images) VALUES ('${title}', '${content}', '${createdBy}', '${createdAt}', '${editedAt}', '${thumbnail}', '${keywords}', ${shared}, '{${images.join(',')}}')`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const createUser = async (id: string, fullName: string, email: string, role: string) => {
    try {
        await client.connect();
        const query = `INSERT INTO users (id, full_name, email, role) VALUES ('${id}, ${fullName}', '${email}', '${role}')`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const createComment = async (blogId: string, userId: string, content: string, createdAt: Date) => {
    try {
        await client.connect();
        const query = `INSERT INTO comments (blog_id, user_id, content, created_at) VALUES ('${blogId}', '${userId}', '${content}', '${createdAt}')`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const createAbout = async (user: string, image: string, content: string, keywords: string) => {
    try {
        await client.connect();
        const query = `INSERT INTO about (id, user, image, content, keywords) VALUES ('${user}', '${image}', '${content}', '${keywords}')`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const createContact = async (
    user: string,
    email: string,
    phone: string,
    address: string,
    socialMedias: string[]
) => {
    try {
        await client.connect();
        const query = `INSERT INTO contact (user, email, phone, address, social_medias) VALUES ('${user}', '${email}', '${phone}', '${address}', '{${socialMedias.join(',')}`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const createProject = async (
    title: string,
    description: string,
    thumbnail: string,
    images: string[],
    keywords: string,
    shared: boolean,
    year: number,
    owner: string,
    links: string[]
) => {
    try {
        await client.connect();
        const query = `INSERT INTO projects (title, description, thumbnail, images, keywords, shared, year, owner, links) VALUES ('${title}', '${description}', '${thumbnail}', '{${images.join(',')}}', '${keywords}', ${shared}, ${year}, '${owner}', '{${links.join(',')}}')`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const createTechs = async (title: string, link: string, subclass: string, ui_tag: string) => {
    try {
        await client.connect();
        const query = `INSERT INTO techs (id, title, link, subclass, ui_tag) VALUES ('${encodeURI(title)}', '${title}', '${link}', '${subclass}', '${ui_tag}')`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const createTechClasses = async (title: string) => {
    try {
        await client.connect();
        const query = `INSERT INTO tech_classes (id, title) VALUES ('${encodeURI(title)}', '${title}')`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

export {
    createBlog,
    createUser,
    createComment,
    createAbout,
    createContact,
    createProject,
    createTechs,
    createTechClasses,
};
