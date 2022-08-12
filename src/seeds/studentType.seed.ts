import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { StudentType } from '../entity/StudentType'

export default class CreateStudentTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    /*await connection
      .createQueryBuilder()
      .insert()
      .into(StudentType)
      .values([
        { id: 0, name: 'Otro' },
        { id: 1, name: 'Estudiante' }
      ])
      .execute()*/
      await factory(StudentType)().seedMany(1)
  }
}