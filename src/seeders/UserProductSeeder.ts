import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities/user';
import { users } from '../db/user.db';
import { products } from '../db/product.db';
import { Product } from '../entities/product';


export class UserProductSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    // const usersEntities: User[] = users;
    for (const userId of users) {
      em.create(User, {
        id: userId
      })
    }

    for (const product of products) {
      em.create(Product, {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price
      })
    }
  }

}
