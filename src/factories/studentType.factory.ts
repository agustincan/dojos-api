import { StudentType } from "../entity/StudentType"
import { define } from "typeorm-seeding"
import Faker from "faker"

define(StudentType, (faker: typeof Faker) => {
  const gender = faker.random.number(1)
  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName(gender)
 
  const st = new StudentType()
  st.id = 0
  st.name = "Otros"
  return st
})