module.exports = ( sequelize, dataType ) => {
  const appointment = sequelize.define('AppointmentTB', {
    firstName: {
      type: dataType.STRING,
      allowNull: false
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false
    },
    age: {
      type: dataType.INTEGER,
      allowNull: false
    },
    gender: {
      type: dataType.STRING,
      allowNull: false
    },
    status: {
      type: dataType.STRING,
      allowNull: false
    },
    address: {
      type: dataType.STRING,
      allowNull: false
    },
    city: {
      type: dataType.STRING,
      allowNull: false
    },
    pincode: {
      type: dataType.STRING,
      allowNull: false
    },
    contact: {
      type: dataType.STRING,
      allowNull: false
    },
    mail: {
      type: dataType.STRING,
      allowNull: true
    },
    appointmentDate: {
      type: dataType.DATE,
      allowNull: false
    },
    appointmentTime: {
      type: dataType.TIME,
      allowNull: false
    },
    guardianName: {
      type: dataType.STRING,
      allowNull: false
    },
    guardianRelation: {
      type: dataType.STRING,
      allowNull: false
    },
    guardianContact: {
      type: dataType.STRING,
      allowNull: false
    },
    payment: {
      type: dataType.STRING,
      allowNull: false
    },
    doctorName: {
      type: dataType.STRING,
      allowNull: false
    },
    symptoms: {
      type: dataType.STRING,
      allowNull: false
    }   
  })
  return appointment
}