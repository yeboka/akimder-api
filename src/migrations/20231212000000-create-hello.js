module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Hellos', {
            message: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Hellos');
    },
};
