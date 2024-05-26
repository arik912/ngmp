import {MikroORM} from '@mikro-orm/core';
import {EntityManager, PostgreSqlDriver} from '@mikro-orm/postgresql';
import {EntityManager as BetterSqliteEntityManager, BetterSqliteDriver} from '@mikro-orm/better-sqlite';

import ormConfig from './src/config/orm.config';

export const container = {} as {
    orm: MikroORM,
    em: EntityManager|BetterSqliteEntityManager,
};

export const init = async () =>{
    const orm = await MikroORM.init<PostgreSqlDriver|BetterSqliteDriver>(ormConfig);

    const migrator = orm.getMigrator();
    await migrator.up();

    container.orm = orm;
    container.em = orm.em;
}
