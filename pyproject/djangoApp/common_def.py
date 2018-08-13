# -*- coding: utf-8 -*-


def get_dict(connection, sql):
    cursor = connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    cols = [desc[0] for desc in cursor.description]

    list_rows = []
    for row in result:
        obj = {}
        for index, value in enumerate(row):
            obj[cols[index]] = value
        list_rows.append(obj)

    return list_rows
