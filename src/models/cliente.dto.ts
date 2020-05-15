export interface ClienteDTO{
    id : string;
    nome : string;
    email : string;
    imageUrl? : string;    //-- ? na frente do atributo, significa que ele é opcional e não precisa ser preenchido
}