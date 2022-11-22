class Config{
    static constants = {
        development: {
            'SIMULATION_API': 'https://apidev-portal.pontte.com.br'
        },
        staging: {
            'SIMULATION_API': 'https://apistaging-portal.pontte.com.br'
        },
        production: {
            'SIMULATION_API': 'https://api-portal.pontte.com.br'
        }
    }
    constructor(NODE_ENV) {
        this.env = NODE_ENV

    }


    static run=()=>{
        return this.constants
    }
}
