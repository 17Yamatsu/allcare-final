import connection from '../config/db.js'
import bcrypt from 'bcryptjs'

// Criar (POST)
export const createUser = (data, res) => {
  
    try{
  
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.usr_pwd, salt);    

    const sql = `
    INSERT INTO usuario 
    (usr_name, usr_email, usr_birthday, usr_cpf,
     usr_estado, usr_cidade,
     usr_rua, usr_cep, usr_numero,
     usr_complemento, usr_bairro, usr_pwd)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.usr_name,
    data.usr_email,
    data.usr_birthday,
    data.usr_cpf,
    data.usr_estado,
    data.usr_cidade,
    data.usr_rua,
    data.usr_cep,
    data.usr_numero,
    data.usr_complemento,
    data.usr_bairro,
    hashedPassword
];

  connection.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      message: "Usuário criado",
      id: result.insertId
    });
  });
}catch (error) {
    console.error(error);
    res.status(500).json({ error: err.message });
  }
}


// Atualizar (PUT)
export const updateUser = (id, data, res) => {
    const fields = []
    const values = []

    // monta dinamicamente só o que veio
    for (const key in data) {
        fields.push(`${key}=?`)
        values.push(data[key])
    }

    if (key === 'usr_pwd') {
        const salt = await bcrypt.genSalt(10)
        value = await bcrypt.hash(value, salt)
    }

    fields.push(`${key}=?`)
    values.push(value)
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
};

export const loginUser = (email, password, res) => {
  const sql = `SELECT * FROM usuario WHERE usr_email=?`;

  connection.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.usr_pwd);

    if (!isMatch) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    res.json({ message: "Login bem-sucedido", user });
  });
};
