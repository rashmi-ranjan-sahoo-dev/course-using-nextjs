import jwt from "jsonwebtoken";


const secret = process.env.USER_SECRET!;

export function verifyUser( headers: Headers){

    const authHeader = headers.get("authorization");

    if(!authHeader || !authHeader.startsWith("Beater ")){
        throw new Error( "Unauthorized: Token Missing");
    }

    console.log(authHeader);

    const token  = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, secret) as { id: string};

        return decoded.id;
    } catch {
        throw new Error( "Unauthorized: Invalid token")
    }
}