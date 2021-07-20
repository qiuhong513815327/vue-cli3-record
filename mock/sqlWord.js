module.exports = {
  select: function(params = "*", database = "websites") {
    return `SELECT ${params} FROM ${database}`;
  },
  insert: function(params, database = "websites") {
    return `INSERT INTO ${database} (${params.keys}) VALUES(${params.values})`;
  },
  delete: function(params, database = "websites") {
    return `DELETE FROM ${database} WHERE ${params.keyValue}`;
  }
};
