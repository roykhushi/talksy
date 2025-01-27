export const signup = (req,res) => {
    const {fullName,email,password} = req.body;
    try {
        //sign up the user
        //hash their pswd
        //generate a token to let users know they have been signed up
        
    } catch (error) {
        
    }
};

export const login = (req,res) => {
    res.send("Login Route");
};

export const logout = (req,res) => {
    res.send("Logout Route");
};