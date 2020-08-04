import hello from './hello';
import Post from './Post';
import '../style/style.scss'

const yrr = 66666

const post_1 = new Post('lalalalala from  src')
const aaa = 'hellohd ld'

hello(aaa)
hello(post_1.print())
hello(post_1.print())
   

const obj = {
    name:'jon',
    age:34,
    isAdmin:false,
    chil:[1,2,3,4]
}

const user={
    ...obj,
    chil:'colll',
    name:'bob',
}



hello(user)