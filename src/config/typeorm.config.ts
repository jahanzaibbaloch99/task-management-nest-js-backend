import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tasks } from 'src/tasks/tasks.entity';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'baloch',
  database: 'taskmanagement',
  entities: [Tasks],
  synchronize: true,
};
