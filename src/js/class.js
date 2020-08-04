

class User{
    constructor(name,age,job='none'){
        this.name = name
        this.age = age
        this.job = job
    }
    forJob(){
        const job = this.job
        return job.map(item=>{
            console.log(`item_Job:${item}`);           
        })
    }

    about(){   
        console.log(`My naume ${this.name} | age: ${this.age} | job: ${this.job  }`);
        
    }   
}




const user_1 = new User('Magram',34,['dev','teather','man'])

user_1.about()