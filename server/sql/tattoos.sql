
--psql -d laptop -f tattoos.sql
INSERT INTO items (name, path, category) VALUES (
    'tiger',
    '/images/tattoos/1.png',
    'tattoos'
),(
    'lion',
    '/images/tattoos/2.png',
    'tattoos'
),
(
    'wolf',
    '/images/tattoos/3.png',
    'tattoos'
),
(
    'back',
    '/images/tattoos/4.png',
    'parts'
),
(
    'arm',
    '/images/tattoos/5.png',
    'parts'

), 
(
   'leg',
    '/images/tattoos/6.png',
    'parts'
);
