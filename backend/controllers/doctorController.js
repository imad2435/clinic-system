import User from '../models/User.js'; // <-- Note .js extension and import style

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public (for now, we'll add auth later)
 getAllDoctors = async (req, res) => {
  try {
    // Find all users with the role of 'doctor'
    const doctors = await User.find({ role: 'doctor' }).select('-password'); // .select('-password') prevents the password from being sent

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllDoctors,
};