import { promises } from 'dns'
import {Document} from 'mongoose'



export interface BookInterface extends Document{

    title:string,
    author:string,
    genre:string,
    isbn :string,
    description:string,
    copies:number,
    available:boolean,


    functionLogic(quantity:number):Promise<void>

}
