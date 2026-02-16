const userService = require('../services/userService');

class UserController {
  // Get current user profile
  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserProfile(req.user.userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update current user profile
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req.user.userId, req.body);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all users (admin only)
  async getAllUsers(req, res, next) {
    try {
      const { page, limit, sort } = req.query;
      const result = await userService.getAllUsers({}, { page, limit, sort });
      res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user by ID (admin only)
  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete user (admin only)
  async deleteUser(req, res, next) {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update user role (admin only)
  async updateUserRole(req, res, next) {
    try {
      const { role } = req.body;
      const user = await userService.updateUserRole(req.params.id, role);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
