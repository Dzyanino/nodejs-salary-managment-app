const { Sequelize, DataTypes } = require("sequelize");
const SalEnsModel = require("../models/SalaireEnseignant");

const conProps = {
    databaseName: "Express-Vue-salary-managment",
    username: "remoteUser",
    password: "remote_User",
    host: "192.168.56.103",
    dialect: "postgres"
};

const sequelize = new Sequelize(conProps.databaseName, conProps.username, conProps.password, {
    host: conProps.host,
    dialect: conProps.dialect
});

const SalEns = SalEnsModel(sequelize, DataTypes);


module.exports = {
    sequelize,
    SalEns
}