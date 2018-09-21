from sql.postgres import Postgres

class MigrateDatabase(object):

    def now(self):
        try:
            Postgres().execute(open('server/sql/1.create.table.message.sql').read())
        except Exception, e:
            print e
            raise e
