import {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {BetterSqliteDriver} from '@mikro-orm/better-sqlite';

import config from './app.config';

import {User} from '../resources/user/user.model';
import {Cart} from '../resources/cart/cart.model';
import {CartItem} from '../resources/cart/cart-item.model';
import {Product} from '../resources/product/product.model';
import {Order} from '../resources/order/order.model';

const options: Options<PostgreSqlDriver|BetterSqliteDriver> = {
    entities: [User,Cart, CartItem, Product,Order],
    migrations: {
        // path to the folder with migrations:
        path: `${__dirname}/src/migrations`,
        // path to the folder with TS migrations (if used, we should put path to compiled files in `path`):
        pathTs: config.isTestingEnv ? undefined : `${__dirname}/src/migrations`,
    },
    type: config.isTestingEnv ? 'better-sqlite' : 'postgresql',
    seeder: {
        pathTs: './src/seeders',
    }
};

export default options;
