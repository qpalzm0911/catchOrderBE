export default {
    users: `
      CREATE TABLE IF NOT EXISTS users
      (
          userId    Int not null auto_increment PRIMARY KEY,
          tableId   Int not null,
          imgUrl    TEXT not null,
          name  varchar(10)  not null,
          phoneNumber   varchar(11) not null,
          verifyCode    Int not null,
          status    Int not null,
          createdAt timestamp    not null default current_timestamp()
      );
  `,

    menus: `
      CREATE TABLE IF NOT EXISTS menus
      (
          menuId    Int  not null auto_increment PRIMARY KEY,
          menuName  varchar(20) not null,
          menuPrice Int not null,
          description   Int not null,
          status    Int not null,
          createdAt timestamp    not null default current_timestamp()
      )
  `,

    orders: `
      CREATE TABLE IF NOT EXISTS orders
      (
          orderId   Int not null auto_increment   PRIMARY KEY,
          menuId    Int not null,
          userId    Int not null,
          count     Int not null,
          status    Int not null,
          createdAt timestamp    not null default current_timestamp()
      )
  `,
    tables: `
      CREATE TABLE IF NOT EXISTS tables
      (
          tableId   Int not null  auto_increment  PRIMARY KEY,
          status    Int not null
      )
  `,
};
