import 'dotenv/config';
import {config, createSchema} from '@keystone-next/keystone/schema';
import {createAuth} from '@keystone-next/auth';
import {withItemData, statelessSessions} from '@keystone-next/keystone/session';
import {User} from './schemas/User';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-ivy';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long they stay signed in?
    secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        //todo add initial roles here
    }
})

export default withAuth(config({
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
        //show ui only for people who pass this test
        isAccessAllowed: ({session}) =>
        !!session?.data,
    },
    //TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
        User: `id name email`
    })
}));