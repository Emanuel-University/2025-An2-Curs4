This folder is shared in docker container name: `mysql.taskproject` under folder `/database`.

You can open the mysql docker using the command: 
- `docker compose exec mysql bash` 

Then if needed you can copy the SQL file to import it on MySql server, using the command:
- `mysql -u task -p task < database.sql`
    
Then if needed you can export the database to a SQL file using the command, using the command:
- `mysqldump -u task -p task > database.sql`