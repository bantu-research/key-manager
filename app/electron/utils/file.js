const dayjs = require('dayjs');
const { getBitcoinNetworkType, getMultisigDerivationPathForNetwork } = require('../bitcoin/index');

const createColdCardSetupFile = (requiredSigners, totalSigners, accountName, importedDevices, currentBitcoinNetwork, format = 'P2WSH') => {
	const derivationPath = getMultisigDerivationPathForNetwork(currentBitcoinNetwork);
	return `# Coldcard Multisig setup file (created by Dux Reserve Desktop Key Manager Beta on ${dayjs(Date.now()).format('MM[/]DD[/]YYYY HH[:]mm')})
#
Name: ${accountName.substr(0, 20)}
Policy: ${requiredSigners} of ${totalSigners}
Derivation: ${derivationPath}
Format: ${format}
${importedDevices.map(device => `\n${device.parentFingerprint}: ${device.xpub}`).join('')}
`;
};

const formatFileName = (fileName, fileExtension = '', withNetwork = false, currentBitcoinNetwork = {}) =>
	`${fileName}-${withNetwork ? getBitcoinNetworkType(currentBitcoinNetwork) + '-' : ''}${dayjs().format('DD[-]MMMM[-]YYYY[-]HHmmss').toLowerCase()}${fileExtension &&
	fileExtension.length > 0
		? `.${fileExtension}`
		: ''}`;

module.exports = {
	createColdCardSetupFile,
	formatFileName,
};
