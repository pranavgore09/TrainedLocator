var RNDBModel = require('react-native-db-models')

var DB = {
	"assets": new RNDBModel.create_db('assets'),
	"vaults": new RNDBModel.create_db('vaults'),
}

module.exports = DB
