import connection from '../config/db.js'

// Criar (POST)
export const createUser = (data, res) => {
  const sql = `
    INSERT INTO usuario 
    (usr_name, usr_mail, usr_birthday, usr_cpf,
     usr_address_country, usr_address_state, usr_address_city,
     usr_adress_streetname, usr_adress_cep, usr_address_number,
     usr_address_type, usr_address_neighborhood, usr_pwd)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.usr_name,
    data.usr_mail,
    data.usr_birthday,
    data.usr_cpf,
    data.usr_address_country,
    data.usr_address_state,
    data.usr_address_city,
    data.usr_adress_streetname,
    data.usr_adress_cep,
    data.usr_address_number,
    data.usr_address_type || "Casa",
    data.usr_address_neighborhood,
    data.usr_pwd 
];

  connection.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      message: "Usuário criado",
      id: result.insertId
    });
  });
};


// Atualizar (PUT)
export const updateUser = (id, data, res) => {
    const fields = []
    const values = []

    // monta dinamicamente só o que veio
    for (const key in data) {
        fields.push(`${key}=?`)
        values.push(data[key])
    }

    const sql = `
        UPDATE usuario SET
        ${fields.join(', ')}
        WHERE usr_id=?
    `

    values.push(id)

    connection.query(sql, values, (err, result) => {
        if (err) return res.status(500).json(err)

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' })
        }

        res.json({ message: 'Usuário atualizado' })
    })
}
// export const updateUser = (id, data, res) => {
//     const sql = `
//         UPDATE usuario SET
//         usr_name=?, usr_mail=?, usr_birthday=?, usr_cpf=?, usr_address=?, 
//         usr_cep=?, usr_type=?, usr_pwd=?, usr_medicalinfo=?
//         WHERE usr_id=?`

//     connection.query(sql, [...Object.values(data), id], (err, result) => {
//         if (err) return res.status(500).json(err)

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ erro: 'Usuário não encontrado' })
//         }

//         res.json({ message: 'Usuário atualizado' })
//     })
// }

// Listar (GET)
export const getUsers = (res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) return res.status(500).json(err)
        res.json(results)
    })
}

// Deletar (DELETE)
export const deleteUser = (id, res) => {
    const sql = `DELETE FROM usuario WHERE usr_id=?`

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err)

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' })
        }

        res.json({ message: 'Usuário deletado com sucesso' })
    })
}