export default {
    user: `
      CREATE TABLE IF NOT EXISTS user
      (
          userId    Int not null PRIMARY KEY,
          tableId   Int not null,
          imgUrl    TEXT not null,
          name  varchar(10)  not null,
          phoneNumber   varchar(11) not null,
          verifyCode    Int not null,
          status    Int not null,
          createdAt timestamp    not null default current_timestamp()
      );
  `,

    menu: `
      CREATE TABLE IF NOT EXISTS menu
      (
          menuId    Int  not null PRIMARY KEY,
          menuName  varchar(20) not null,
          menuPrice Int not null,
          description   Int not null,
          status    Int not null,
          createdAt timestamp    not null default current_timestamp()
      )
  `,

    order: `
      CREATE TABLE IF NOT EXISTS order
      (
          orderId   Int not null    PRIMARY KEY,
          menuId    Int not null,
          userId    Int not null,
          count     Int not null,
          status    Int not null,
          createdAt timestamp    not null default current_timestamp()
      )
  `,
    table: `
      CREATE TABLE IF NOT EXISTS table
      (
          tableId   Int not null PRIMARY KEY,
          status    Int not null
      )
  `
};
