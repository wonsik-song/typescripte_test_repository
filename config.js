// please rename this file to config.js
const path = require('path')
const dataPath = path.join(__dirname, 'data')

module.exports = {
	secret: 'SeCrEtKeYfOrHaShInG',
	//'mongodbUri': 'mongodb://foodsommelier:V1lmJOStJJYyhSBMASYuEnPJ4YUwBumM5kNr1703KZAy2QGZrEDgwXWJxlEkFOvbdvpFTQA5MAj6RSxmgAeSbQ==@foodsommelier.documents.azure.com:10255/?ssl=true&replicaSet=globaldb'
	//'mongodbUri': 'mongodb://foodsommelier:V1lmJOStJJYyhSBMASYuEnPJ4YUwBumM5kNr1703KZAy2QGZrEDgwXWJxlEkFOvbdvpFTQA5MAj6RSxmgAeSbQ==@foodsommelier.documents.azure.com:10255/?ssl=true&replicaSet=globaldb'
	//'mongodbUri': 'mongodb://localhost:27017/myprojectdbname',
	storageUri: 'https://foodsomelierstorage.blob.core.windows.net/',
	dataPath: dataPath,
	mongodbUri: 'mongodb://localhost:27017/admin',
	CLIENT_ID: '222033073305-aaef3mh2dtpbpbeaid2822f27979110n.apps.googleusercontent.com',
	//'mongodbUri': 'mongodb://localhost:27017/myprojectdbname'
	//'mongodbUri':'mongodb://foodsommelierdb:Uy19GVPU5AWIaZicj2rnCl2OQ1PSxJhNSuQduDtpqW5xOnQpq3ldUp5Ss4JPrTzOBiAVRhST9ZGiOlWdUeG1DQ==@foodsommelierdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb'
	//'mongodbUri':'mongodb://foodsommelierdb:Uy19GVPU5AWIaZicj2rnCl2OQ1PSxJhNSuQduDtpqW5xOnQpq3ldUp5Ss4JPrTzOBiAVRhST9ZGiOlWdUeG1DQ==@foodsommelierdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb'
}
