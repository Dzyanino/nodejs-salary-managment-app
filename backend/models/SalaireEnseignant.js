module.exports = (sequelize, dataTypes) => {
    const SalEns = sequelize.define('SalEns', {
        numEns: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        nom: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        nbHeure: {
            type: dataTypes.REAL,
            allowNull: false
        },
        tauxHoraire: {
            type: dataTypes.REAL,
            allowNull: false
        }
    },
    {
        tableName: "salaireEnseignant",
        timestamps: false
    });

    return SalEns;
}