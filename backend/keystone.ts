import 'dotenv/config';
import {config, createSchema} from '@keystone-next/keystone/schema';
import {User} from './schemas/User';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-ivy';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long they stay signed in?
    secret: process.env.COOKIE_SECRET,
}

export default config({
    // @ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        //TODO: add data seeding here
    },
    lists: createSchema({
        //Schema items go here
        User
    }),
    ui: {
        //Todo: chance this for roles
        isAccessAllowed: () => true,
    },
    //TODO: add session values here
});