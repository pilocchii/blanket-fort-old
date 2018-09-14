class Sound {

    constructor() {
        this.sounds = {
            "hero_hurt": new Audio("./audio/dsoof.wav"),
            "hero_shoot": new Audio("./audio/hero-shoot.wav"),
            "enemy_shoot": new Audio("./audio/shoot-1.wav"),
            "arrow_fire": new Audio("./audio/Arrow-Fire.wav"),
            "crow_caw": new Audio("./audio/crow-caw.wav"),
            "enemy_hurt_1": new Audio("./audio/enemy-hurt-1.wav"),
            "energy_launcher": new Audio("./audio/energy-launcher.wav"),
            "explosion_1": new Audio("./audio/explosion-1.wav"),
            "lava_ball": new Audio("./audio/lava-ball.wav"),
            "shield_block": new Audio("./audio/shield-block.wav"),
            "sword_swing": new Audio("./audio/sword-swing.wav"),
            "out_of_energy": new Audio("./audio/ooe.wav"),
        }

        let n_dups = 5
        for (var sound in this.sounds) {
            if (this.sounds.hasOwnProperty(sound)) {
                this.sounds[sound] = {
                    "current": 0,
                    "max": n_dups,
                    "sounds": this.make_duplicates(sound, n_dups)
                }
            }
        }
    }


    /* Returns a list of n_dup duplicated Audio objects */
    make_duplicates(sound, n_dup=5) {
        let curr_sound = this.sounds[sound]
        let sound_list = []
        for (let i = 0; i <= n_dup; i++) {
            let clone = curr_sound.cloneNode()
            sound_list.push(clone)
        }
        return sound_list
    }


    /* plays a sound */
    play(sound, volume=0.5) {
        let index = this.sounds[sound]["current"]
        if (index >= this.sounds[sound]["max"]-1) {
            this.sounds[sound]["current"] = 0
        }
        if (!this.sounds[sound]["sounds"][index].ended) {
            this.sounds[sound]["sounds"][index+1].currentTime = 0
            this.sounds[sound]["sounds"][index+1].volume = volume
            this.sounds[sound]["sounds"][index+1].play()
            this.sounds[sound]["current"] += 1
        } else {
            this.sounds[sound]["sounds"][index].currentTime = 0
            this.sounds[sound]["sounds"][index].volume = volume
            this.sounds[sound]["sounds"][index].play()
        }

        
    }
}

export default Sound;