import { Migration } from '@mikro-orm/migrations';

export class Migration20231023152335 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "delivery" ("id" varchar(255) not null, "type" varchar(255) not null, "address" varchar(255) not null, constraint "delivery_pkey" primary key ("id"));');

    this.addSql('create table "payment" ("id" varchar(255) not null, "type" varchar(255) not null, "address" varchar(255) null, "credit_card" varchar(255) null, constraint "payment_pkey" primary key ("id"));');

    this.addSql('create table "product" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "cart" ("id" varchar(255) not null, "is_deleted" boolean not null, "user_id" varchar(255) not null, constraint "cart_pkey" primary key ("id"));');

    this.addSql('create table "order" ("id" varchar(255) not null, "cart_id" varchar(255) not null, "payment_id" varchar(255) not null, "delivery_id" varchar(255) not null, "comments" varchar(255) not null, "status" text check ("status" in (\'created\', \'completed\')) not null, "total" int not null, constraint "order_pkey" primary key ("id"));');
    this.addSql('alter table "order" add constraint "order_cart_id_unique" unique ("cart_id");');
    this.addSql('alter table "order" add constraint "order_payment_id_unique" unique ("payment_id");');
    this.addSql('alter table "order" add constraint "order_delivery_id_unique" unique ("delivery_id");');

    this.addSql('create table "cart_item" ("cart_id" varchar(255) not null, "product_id" varchar(255) not null, "count" int not null, constraint "cart_item_pkey" primary key ("cart_id", "product_id"));');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_payment_id_foreign" foreign key ("payment_id") references "payment" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_delivery_id_foreign" foreign key ("delivery_id") references "delivery" ("id") on update cascade;');

    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order" drop constraint "order_delivery_id_foreign";');

    this.addSql('alter table "order" drop constraint "order_payment_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_product_id_foreign";');

    this.addSql('alter table "cart" drop constraint "cart_user_id_foreign";');

    this.addSql('alter table "order" drop constraint "order_cart_id_foreign";');

    this.addSql('alter table "cart_item" drop constraint "cart_item_cart_id_foreign";');

    this.addSql('drop table if exists "delivery" cascade;');

    this.addSql('drop table if exists "payment" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "cart_item" cascade;');
  }

}
