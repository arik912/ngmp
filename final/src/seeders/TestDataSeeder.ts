import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../resources/user/user.model";
import {Product} from "../resources/product/product.model";

export class TestDataSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      id: 'generated_test_id',
      email: 'test.user@gmail.com',
      password: '$2a$10$jVRwjou3Wf9LbzfAGKa6EeqG3WdA7FE11uan3Itc022gH.VO2Qdeq'
    });

    const iphone = em.create(Product, {
      title: 'Iphone14',
      description:'',
      price: 1400,
    });

    const samsung = em.create(Product, {
      title: 'Samsung a5',
      description:'',
      price: 800,
    });
  }
}
