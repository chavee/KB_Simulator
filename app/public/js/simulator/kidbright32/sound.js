/*void on(uint32_t freq, uint8_t duty_in_percent);
void off(void);
void note(uint8_t note);
void rest(uint8_t duration);
uint32_t get_bpm(void);
void set_bpm(uint32_t val);
uint8_t get_volume(void);
void set_volume(uint32_t val);*/

function Sound() {
	const music_notes_freq = [
		261, // 0 = C4
		277, // 1 = C#4
		293, // 2 = D4
		311, // 3 = Eb4
		329, // 4 = E4
		349, // 5 = F4
		369, // 6 = F#4
		391, // 7 = G4
		415, // 8 = G#4
		440, // 9 = A4
		466, // 10 = Bb4
		493, // 11 = B4
		523, // 12 = C5
		554, // 13 = C#5
		587, // 14 = D5
		622, // 15 = Eb5
		659, // 16 = E5
		698, // 17 = F5
		740, // 18 = F#5
		784, // 19 = G5
		831, // 20 = G#5
		880, // 21 = A5
		932, // 22 = Bb5
		988, // 23 = B5
		1046, // 24 = C6
		1109, // 25 = C#6
		1175, // 26 = D6
		1244, // 27 = Eb6
		1318, // 28 = E6
		1396, // 29 = F6
		1480, // 30 = F#6
		1568, // 31 = G6
		1661, // 32 = G#6
		1760, // 33 = A6
		1865, // 34 = Bb6
		1976, // 35 = B6
		2093 // 36 = C7
	];
	this.context = null;
	this.gain = null;
	this.oscillator = null;
	this.connected = false;
	this.volume_in_percent = 50;

	this._constructor = function() {
		// web audio api
		this.context = new (window.AudioContext || window.webkitAudioContext)();
	}

	this.init = function() {
		this.volume_in_percent = 50;
	}
	this.off = function() {
		if (this.connected) {
			this.gain.disconnect(this.context.destination);
			this.oscillator.stop();
			this.connected = false;
		}
		
	}
	this.note = function(note) {
		this.currentTime = this.context.currentTime;

		this.gain = this.context.createGain();
		this.gain.gain.setValueAtTime(this.volume_in_percent / 100, this.currentTime);

		this.oscillator = this.context.createOscillator();
		this.oscillator.type = 'square';
		this.oscillator.frequency.value = music_notes_freq[note];

		// connect path =  oscillator => gain => destination
		this.oscillator.connect(this.gain);
		this.gain.connect(this.context.destination);

		this.oscillator.start(this.currentTime);
		this.connected = true;
	}

	this.get_volume = function() {
		return this.volume_in_percent;
	}

	this.set_volume = function(val) {
		if ((val >= 0) && (val <= 100)) {
			this.volume_in_percent = val;
		}
	}

	// initialize
	this._constructor();
};
