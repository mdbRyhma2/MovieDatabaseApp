import { getGroups, insertGroup, deleteGroup, getGroupById, insertGroupMember, deleteGroupMember, getGroupMembers } from "../models/Groups.js";


  //GROUP

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
    try {
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

  // Controller to handle group creating
const postGroup = async (req, res, next) => {
  try {
    const group_name = req.body.group_name
    const id_owner = req.body.owner_id
    if (!group_name || group_name.trim() === "") {
        return next(new ApiError("Invalid group name", 400));
    }
    // Insert group into database
    const groupFromDb = await insertGroup(group_name, id_owner);
    await pool.query(
      "INSERT INTO user_groups (user_id, group_id, role) VALUES ($1, $2, $3)",
      [user_id, groupId, "owner"]
    );
    if (!groupFromDb || !groupFromDb.rows[0]) {
      throw new Error("Failed to insert group into the database");
    }
    const group = groupFromDb.rows[0];
    return res.status(201).json(createGroupObject(group.id, group.group_name, group.id_owner));
  } catch (error) {
    console.error("Error in postGroup controller:", error);
    return next(error);
  }
};

// Function to create group object
const createGroupObject = (id, group_name, owner_id) => {
  return {
    id: id,
    group_name: group_name,
    owner_id: owner_id,
  };
};

// Controller to handle group delete
const deleteGroupObject = async (req,res,next) => {
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
  //GROUPMEMBERS

//get groupMembers
const getGroupMembersObject = async (req, res) => {
     try {
      const result = await getGroupMembers(req.params.id);
      return res.json(result.rows);
    } catch (error) {
      console.error("Error fetching groupsMembers:", error);
      res.status(500).json({ error: "Internal server error" });
    } 
  };

    // Controller to handle group joining
const joinGroup = async (req, res, next) => {
    try {
      const user_id = req.body.user_id
      const group_id = req.body.group_id
      // Insert groupmember into database
      insertGroupMember(user_id, group_id)
      return res.status(201).json(joinGroupObject(user_id, group_id));
    } catch (error) {
      console.error("Error in postGroup controller:", error);
      return next(error);
    }
  };

  // Function to join group object
const joinGroupObject = (user_id, group_id) => {
  return {
    user_id: user_id,
    group_id: group_id,
  };
};

// Controller to handle groupmember delete
const deleteGroupMemberObject = async (req,res,next) => {
  console.log("deletegroupMember!! ", req.body)
  try {
    const user_id = req.body.user_id
    const result = await deleteGroupMember(user_id)
    return res.status(200).json({ message: "Groupmember deleted successfully" });
  } catch (error) {
    return next(error)
  }
}


  export { postGroup, getGroupsObject, getGroupByIdObject, getGroupMembersObject, deleteGroupObject,joinGroup, deleteGroupMemberObject };