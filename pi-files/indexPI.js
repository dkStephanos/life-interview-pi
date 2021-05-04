const Gpio = require('pigpio').Gpio;
const mqtt = require('mqtt');
const crypto = require('crypto');

const servoVert = new Gpio(19, { mode: Gpio.OUTPUT });
const servoHoriz = new Gpio(18, { mode: Gpio.OUTPUT });

const dutyShift = 250;

const minDutyCycleVert = 20000;
const maxDutyCycleVert = 32000;
var currentDutyCycleVert = 26000;
const minDutyCycleHoriz = 12000;
const maxDutyCycleHoriz = 52000;
var currentDutyCycleHoriz = 37000;

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const decrypt = (hash) => {
	const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, 'hex')),
		decipher.final(),
	]);

	return decrpyted.toString();
};

const cameraControls = {
	up: () => {
		console.log('Inside cameraControls::up');
		currentDutyCycleVert =
			currentDutyCycleVert - dutyShift > maxDutyCycleVert
				? maxDutyCycleVert
				: currentDutyCycleVert - dutyShift;
		console.log('currentDutyCycle = ', currentDutyCycleVert);
		servoVert.hardwarePwmWrite(20, currentDutyCycleVert);
	},
	down: () => {
		console.log('Inside cameraControls::down');
		currentDutyCycleVert =
			currentDutyCycleVert + dutyShift < minDutyCycleVert
				? minDutyCycleVert
				: currentDutyCycleVert + dutyShift;
		console.log('currentDutyCycle = ', currentDutyCycleVert);
		servoVert.hardwarePwmWrite(20, currentDutyCycleVert);
	},
	left: () => {
		console.log('Inside cameraControls::left');
		currentDutyCycleHoriz =
			currentDutyCycleHoriz + dutyShift > maxDutyCycleHoriz
				? maxDutyCycleHoriz
				: currentDutyCycleHoriz + dutyShift;
		console.log('currentDutyCycle = ', currentDutyCycleHoriz);
		servoHoriz.hardwarePwmWrite(20, currentDutyCycleHoriz);
	},
	right: () => {
		console.log('Inside cameraControls::right');
		currentDutyCycleHoriz =
			currentDutyCycleHoriz - dutyShift < minDutyCycleHoriz
				? minDutyCycleHoriz
				: currentDutyCycleHoriz - dutyShift;
		console.log('currentDutyCycle = ', currentDutyCycleHoriz);
		servoHoriz.hardwarePwmWrite(20, currentDutyCycleHoriz);
	},
};

//Log in information used to authenticate with the MQTT broker
const options = {
	username: 'koiserve',
	password: 'Tarnoff',
};

//Creates the client and connects it to the MQTT broker server with the log in info
const client = mqtt.connect('mqtt://192.168.1.105:1883', options);

process.on('SIGINT', function () {
	console.log('\nScript terminated using Ctrl-C');
	console.log('\nClosing servo output.');
	delete servoVert;
	console.log('\nReassigning servoVert connection as input.');
	let servoVert = new Gpio(PWM_BROADCOM_GPIO_PIN, { mode: Gpio.INPUT });
	delete servoHoriz;
	console.log('\nReassigning servoHoriz connection as input.');
	let servoHoriz = new Gpio(PWM_BROADCOM_GPIO_PIN, { mode: Gpio.INPUT });
	process.exit(0); // This line performs the actual app exit.
});

client.on('connect', function () {
	console.log('\nPi MQTT client connected to broker.\n');
	client.subscribe('pub/camera_controls', function (err) {
		if (err) throw 'Error description: ' + err;
	});
	servoVert.hardwarePwmWrite(20, currentDutyCycleVert);
	servoHoriz.hardwarePwmWrite(20, currentDutyCycleHoriz);
});

client.on('message', function (topic, message) {
	if (topic == 'pub/camera_controls') {
		let data = decrypt(JSON.parse(message.toString()));
		console.log('Received data on topic ' + topic + ': ' + data);

		cameraControls[data]();
	}
});
