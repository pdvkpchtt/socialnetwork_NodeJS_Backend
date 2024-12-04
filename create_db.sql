-- создаем табилцу пользователей
create table users(
	id bigint primary key,
	name varchar(50),
	password varchar(50),
	about varchar(50),
	location varchar(50),
	birth varchar(50)
);

-- создаем табилцу постов
create table posts(
	id bigint primary key,
	title varchar(120),
	text varchar(500),

	user_id bigint, 
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

-- создаем табилцу реакций
create table reactions(
	id bigint primary key,
	type varchar(50),

	post_id bigint,
	user_id bigint, 
	CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES posts(id),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);