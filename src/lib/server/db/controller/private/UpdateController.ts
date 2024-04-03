import { client } from '../../config/postgres.config';

const updateBlog = async (
    id: string,
    title: string,
    content: string,
    editedAt: Date,
    thumbnail: string,
    keywords: string,
    shared: boolean,
    images: string[]
) => {
    try {
        await client.connect();
        const query = `UPDATE blogs SET title = '${title}', content = '${content}', edited_at = '${editedAt}', thumbnail = '${thumbnail}', keywords = '${keywords}', shared = ${shared}, images = '{${images.join(',')}}' WHERE id = '${id}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const updateUser = async (id: string, fullName: string, email: string, role: string) => {
    try {
        await client.connect();
        const query = `UPDATE users SET full_name = '${fullName}', email = '${email}', role = '${role}' WHERE id = '${id}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const updateComment = async (
    id: string,
    blogId: string,
    userId: string,
    content: string,
    createdAt: Date
) => {
    try {
        await client.connect();
        const query = `UPDATE comments SET blog_id = '${blogId}', user_id = '${userId}', content = '${content}', created_at = '${createdAt}' WHERE id = '${id}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const updateAbout = async (user: string, image: string, content: string, keywords: string) => {
    try {
        await client.connect();
        const query = `UPDATE about SET user = '${user}', image = '${image}', content = '${content}', keywords = '${keywords}' WHERE id = '${user}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const updateContact = async (
    user: string,
    email: string,
    phone: string,
    address: string,
    socialMedias: string[]
) => {
    try {
        await client.connect();
        const query = `UPDATE contact SET email = '${email}', phone = '${phone}', address = '${address}', social_medias = '${socialMedias.join(',')}' WHERE user = '${user}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const updateProject = async (
    id: string,
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
        const query = `UPDATE projects SET title = '${title}', description = '${description}', thumbnail = '${thumbnail}', images = '{${images.join(',')}}', keywords = '${keywords}', shared = ${shared}, year = ${year}, owner = '${owner}', links = '{${links.join(',')}}' WHERE id = '${id}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const updateTechs = async (
    id: string,
    title: string,
    link: string,
    subclass: string,
    ui_tag: string
) => {
    try {
        await client.connect();
        const query = `UPDATE techs SET title = '${title}', link = '${link}', subclass = '${subclass}', ui_tag = '${ui_tag}' WHERE id = '${id}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

const updateTechClasses = async (id: string, title: string, link: string, ui_tag: string) => {
    try {
        await client.connect();
        const query = `UPDATE tech_classes SET title = '${title}', link = '${link}', ui_tag = '${ui_tag}' WHERE id = '${id}'`;
        await client.query(query);
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

export {
    updateBlog,
    updateUser,
    updateComment,
    updateAbout,
    updateContact,
    updateProject,
    updateTechs,
    updateTechClasses,
};
