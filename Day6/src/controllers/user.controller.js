import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "chai aur code"
    // })



    const {fullName, email, username,password}= req.body
    console.log("email",email);

    if(fullName ===""){
        throw new ApiError(400,"FullName required")
    }

} )


export {
    registerUser,
}