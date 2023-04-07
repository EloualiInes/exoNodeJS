const dayjs = require('dayjs');
convertDateFr = (date) => {
    return dayjs(date).locale('fr').format('DD/MM/YY')
}

convertStudentsFr = (students) => {
    const newStudents = [];
    students.forEach(student => {
        newStudents.push({...student, birth : convertDateFr(student.birth)})
    });
    return newStudents;
}

deleteStudent = (name) => {
    console.log("delete ", name);
}

module.exports = {
    convertStudentsFr,
    deleteStudent
}