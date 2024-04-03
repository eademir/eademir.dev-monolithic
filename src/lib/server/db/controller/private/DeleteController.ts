import { client } from '../../config/postgres.config';

const deleteItem = async (table: string, id: string) => {
    try {
        await client.connect();
        const query = `DELETE FROM ${table} WHERE id = '${id}'`;
        await client
            .query(query)
            .then(res => console.log(res))
            .catch(error => console.error(error));
    } catch (error) {
        console.error(error);
    } finally {
        await client.end();
    }
};

export default deleteItem;
