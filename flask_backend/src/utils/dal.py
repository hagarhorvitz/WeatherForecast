import mysql.connector
from .app_config import AppConfig

class DAL:
    def __init__(self):
        self.connection = mysql.connector.connect(host = AppConfig.mysql_host, user = AppConfig.mysql_user, password = AppConfig.mysql_password, database = AppConfig.mysql_database)
        self.connection.autocommit = True

    def close(self):
        self.connection.close()

    def get_table(self, sql, params = None):
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, params)
            tables = cursor.fetchall()
            return tables

    def get_scalar(self, sql, params = None):
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, params)
            table = cursor.fetchone()
            return table
    
    def insert(self, sql, params=None):
        with self.connection.cursor() as cursor:
            cursor.execute(sql, params)
            self.connection.commit()
            last_row_id = cursor.lastrowid
            return last_row_id

    def update(self, sql, params=None):
        with self.connection.cursor() as cursor:
            cursor.execute(sql, params)
            self.connection.commit()
            row_count_affected = cursor.rowcount
            return row_count_affected

    def delete(self, sql, params=None):
        with self.connection.cursor() as cursor:
            cursor.execute(sql, params)
            self.connection.commit()
            row_count_affected = cursor.rowcount
            return row_count_affected