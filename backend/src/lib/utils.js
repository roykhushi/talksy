import jwt from "jsonwebtoken";

const generateToken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d"
    });
    //sending jwt in cookie
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true, //prevents xss attacks
        sameSite: "strict", //csrf attacks
        secure: process.env.NODE_ENV !== "development" //hhtp or https(production)
    });

    return token;
}

export default generateToken;