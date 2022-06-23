create table orders(
    id serial primary key,
    product_id bigint references products(id),
    quantity integer
    user_id bigint references users(id)
    status varchar(100)
)