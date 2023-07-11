import { Request, Response } from "express";
import { User } from "../entity/User.entity";

const userRegister = async (req: Request, res: Response) => {
  try {
    const checkExist = await User.findOneBy({ Email: req.body?.Email });
    if (checkExist) {
      return res.status(400).json({
        success: false,
        message: "User is already exists",
      });
    }

    const { FullName, Email, DOB, Profile_Picture, Country } = req.body;

    console.log("req.body;", req.body);

    // if (!FullName || !Email || !DOB || !Profile_Picture) {
    if (!FullName || !Email) {
      return res.status(400).json({
        success: false,
        message: "Please enter requied details.",
      });
    }

    const user = User.create(req.body);

    const userData = await user.save();
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please enter required details.",
      });
    }

    const checkExist = await User.findOneBy({ id: id });
    if (!checkExist) {
      return res.status(400).json({
        success: false,
        message: "User is not exist.",
      });
    }

    const updateUser = await User.update({ id: id }, req.body);
    const getUser = await User.findOneBy({ id: id });
    if (!updateUser) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      data: getUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const userDetails = await User.find();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please enter required details.",
      });
    }
    const user = await User.findOneBy({ id: id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    const deleteUser = await User.delete({ id: id });
    if (deleteUser) {
      return res.status(200).json({
        success: true,
        data: deleteUser,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UserController = {
  userRegister,
  updateUserDetails,
  getAllUser,
  deleteUser,
};

export default UserController;
