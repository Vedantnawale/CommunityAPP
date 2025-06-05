const userModel = require("../model/userSchema");
const multer = require("multer");

const bcrypt = require('bcrypt');

const { default: AppError } = require("../utilis/error.util");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,

}

const upload = multer();

exports.signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400)); // isko capture karo or aage bhej do
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        return next(new AppError('Email is already exists', 400))
    }

    const user = await userModel.create({
        fullName,
        email,
        password,
    })

    if (!user) {
        return next(new AppError('User registration failed, please try again', 400));
    }


    await user.save();

    user.password = undefined;

    //const token = await user.jwtToken();

    //res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
    })

}

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All Fields Are Required"
        })
    }
    try {
        const user = await userModel.findOne({ email }).select('+password') // yachyat email sobt fkt password aala pahije mhnun

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = await user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, // 24h
            httpOnly: true
        }

        res.cookie("jwt", token, cookieOption);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

exports.getUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.logout = (req, res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("token", null, cookieOption);
        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.editUser = [upload.none(), async (req, res) => {
    try {
        const { fullName, bio } = req.body;
        const skills = JSON.parse(req.body.skills || '[]');
        const socialLinks = {
            linkedin: req.body.linkedin || '',
            github: req.body.github || ''
        };


        const { id } = req.params;

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Authorization Failed"
            });
        }

        if (fullName) user.fullName = fullName;
        if (bio) user.bio = bio;
        if (Array.isArray(skills)) user.skills = skills;

        if (socialLinks) {
            user.socialLinks.linkedin = socialLinks.linkedin;
            user.socialLinks.github = socialLinks.github;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User details updated successfully!",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}
];


exports.getDevelopers = async (req, res) => {
    //console.log("Get Users Called");
    try {
        const users = await userModel.find();
        if (!users) {
            return res.status(500).json({
                success: false,
                message: "No Posts Available"
            })
        }
        res.status(200).json({
            success: true,
            message: "All Users",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
