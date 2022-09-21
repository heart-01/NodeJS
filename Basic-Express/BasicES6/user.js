class User {

    constructor(name='Guest'){
        this.name = name
    }

    sayHi(){
        console.log(`Hi ${this.name}`)
    }

}

export default User