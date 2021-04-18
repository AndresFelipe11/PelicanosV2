export class UserModel{
    id: string;
    realm: string;
    username: string;
    email: string;
    password: string;
    rol: number;
    user: UserModel;
    isLogged:boolean = false;
    isAdmin:boolean = false;
}