-- Add a mock data to Product table
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'Product One', 'Short Product Description1', 2.4);
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'ProductNew', 'Short Product Description3', 10);
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'ProductTop', 'Short Product Description2', 23);
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'ProductTitle', 'Short Product Description7', 15);
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Product', 'Short Product Description2', 23);
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-48c5-9345-fc73348a80a1', 'ProductTest', 'Short Product Description4', 15);
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Product2', 'Short Product Description1', 23);
INSERT INTO "Product" (id, title, description, price) VALUES ('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 'ProductName', 'Short Product Description7', 15);

-- Add a mock data to Stock table
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 4);
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 6);
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 7);
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 12);
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 7);
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-48c5-9345-fc73348a80a1', 8);
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 2);
INSERT INTO "Stock" ("productId", count) VALUES ('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 3);
