import { getGroups, insertGroup, deleteGroup, getGroupById } from "../models/Groups.js";



//get groups
const getGroupsObject = async (req, res) => {
    try {
      const result = await getGroups();
      return res.json(result.rows);
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

//get group by id
const getGroupByIdObject = async (req, res) => {
  console.log("Request received for group id:", req.params.id);
    try {
      console.log("get groups by id object")

      const { id } = req.params;
      const group = await getGroupById(id);

      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }

      return res.json(group);
    } catch (error) {
      console.error("Error fetching group:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

//get group members
const getGroupMembersObject = async (req, res) => {
    try {
      const groupId = req.params.id;

      const groupResult = await getGroups();

      const membersResult = await getGroupMembersObject(groupId);

      if (groupResult.rowCount === 0) {
        return res.status(404).json({ error: "Group not found" });
      }

      return res.status(200).json({
      group_name: groupResult.rows[0].group_name,
      members:membersResult.rows,
      });
    } catch (error) {
      console.error("Error fetching group members:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // Controller to handle group creating
const postGroup = async (req, res, next) => {
  try {
    const { group_name } = req.body;

    if (!group_name || group_name.trim() === "") {
        return next(new ApiError("Invalid group name", 400));
    }

    // Insert group into database
    const groupFromDb = await insertGroup(group_name);

    if (!groupFromDb || !groupFromDb.rows[0]) {
      throw new Error("Failed to insert group into the database");
    }

    const group = groupFromDb.rows[0];

    return res.status(201).json(createGroupObject(group.id, group.group_name));
  } catch (error) {
    console.error("Error in postGroup controller:", error);
    return next(error);
  }
};

// Function to create group object
const createGroupObject = (id, group_name) => {
  return {
    id: id,
    group_name: group_name,
  };
};

// Controller to handle account delete
const deleteGroupObject = async (req,res,next) => {
  console.log("deletegroupobject ", req.params.id)
  try {
    const id = req.params.id
    const result = await deleteGroup(id)


    if (result.rowCount === 0) {
      return next(new ApiError("Group not found or already deleted", 404))
    }
    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    return next(error)
  }
}


  export { postGroup, getGroupsObject, getGroupByIdObject, getGroupMembersObject, deleteGroupObject };