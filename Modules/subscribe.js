const connection = require('./init');

const addNewStudent = (student) => {
    return new Promise((resolve, reject) => {
        let q = "INSERT INTO students (profile_id, name, cd) VALUES";
        q += `(${student.id}, ${student.name}, ${student.cr})`;
        connection.query(q, (error, results, fields) => {
            if (error) reject(error);
            else resolve(results, fields);
        });
    })
}

const addNewTeacher = (teacher_id) => {
    return new Promise((resolve, reject) => {
        let q = `INSERT INTO teachers (profile_id) VALUES ('${teacher_id}');`
        connection.query(q, (error, results, fields) => {
            if (error) reject(error);
            else resolve(results, fields);
        });
    })
}

const addNewClass = (classroom, teacher_id) => {
    return new Promise((resolve, reject) => {
        let q = `INSERT INTO classrooms (code, teacher_id) VALUES ('${classroom}', '${teacher_id}' `;
        connection.query(q, (error, results, fields) => {
            if (error) reject(error);
            else resolve(results, fields);
        });
    })
}

module.exports = {
    addNewStudent,
    addNewTeacher,
    addNewClass
}