export default {
    User: `
      CREATE TABLE IF NOT EXISTS User
      (
          userId    Int not null auto_increment PRIMARY KEY,
          tableId   Int not null,
          name  varchar(10) null,
          phoneNumber   varchar(11) null,
          verifyCode    Int not null,
          status    Int not null  DEFAULT 1,
          createdAt timestamp    not null default current_timestamp()
      );
  `,

    Menu: `
      CREATE TABLE IF NOT EXISTS Menu
      (
          menuId    Int  not null auto_increment PRIMARY KEY,
          menuName  varchar(20) not null,
          menuPrice Int not null,
          imgUrl    TEXT not null,
          status    Int not null DEFAULT 0,
          createdAt timestamp    not null default current_timestamp()
      )
  `,

    Order: `
      CREATE TABLE IF NOT EXISTS Orders
      (
          orderId   Int not null,
          menuId    Int not null,
          userId    Int not null,
          count     Int not null,
          status    Int not null DEFAULT 0,
          createdAt timestamp    not null default current_timestamp()
      )
  `,
    Table: `
      CREATE TABLE IF NOT EXISTS Tables
      (
          tableId   Int not null  auto_increment  PRIMARY KEY,
          status    Int not null  DEFAULT 0
      )
  `,
};
