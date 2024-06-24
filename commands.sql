CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	author TEXT,
	url TEXT NOT NULL,
	title TEXT NOT NULL,
	likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title)
values 
	('Michael Chan', 'https://reactpatterns.com/', 'React Patterns'),
	('Edsger W. Dijkstra',  'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 'Go To Statement Considered Harmful')
;
