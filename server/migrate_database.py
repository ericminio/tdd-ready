from sql.postgres import Postgres

class MigrateDatabase(object):

    def now(self):
        try:
            Postgres().execute('create table if not exists message(content varchar(50));')
        except Exception, e:
            print e
            raise e
