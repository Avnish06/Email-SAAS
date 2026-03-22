import { User } from "../Models/User.model.js";

export const contactDetails = async (req, res) => {
  try {
    const { contact } = req.body;

    // ✅ Validate input
    if (!contact || !Array.isArray(contact) || contact.length === 0) {
      return res.status(400).json({
        message: "User Contact Details is required here",
      });
    }

    console.log(contact);

    // ✅ Find user
    const user = await User.findById(req.userId);
    console.log(req.userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ✅ Add contacts correctly (no nested array)
    user.contacts.push(...contact);
    

    // ✅ Optional: Auto-deduplicate (recommended)
    user.contacts = [...new Set(user.contacts)];

    // ✅ Save
    await user.save();

    return res.status(200).json({
      message: "User Contact saved Successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while saving the contact details",
      error: error.message,
    });
  }
};

export const sendContactdetails = async(req, res) => {
  try {
    const user = await User.findById(req.userId)
    if(!user)
    {
       return res.status(400).json({message: "User Details is required"})
    }
     const contactDetails = await user.contact
  
     return res.status(200).json({message:"User data fetched successfully"})
  } catch (error) {
     return res.status("Something went Wrong while fetching the user details", error)
  }

}
