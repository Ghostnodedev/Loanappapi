export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'Ghostroot',
    password: 'mysqldb2003',
    database: 'loan',
    waitForConnections: true,
    });

    const [rows] = await connection.execute('SELECT * FROM users');
    await connection.end(); // close connection

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}