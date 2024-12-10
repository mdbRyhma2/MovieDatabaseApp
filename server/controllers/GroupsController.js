import { getGroups, insertGroup, deleteGroup, getGroupById, insertGroupMember } from "../models/Groups.js";



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
  console.log("Request received for group id:", req.params);
    try {
      console.log("get group by id object")

       const { id } = req.params;
      const group = await getGroupById(id);
      
      console.log("Request received for group id:", req.params);

      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }

      return res.json(group);
    } catch (error) {
      console.error("Error fetching group:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

    // Controller to handle group joining
const joinGroup = async (req, res, next) => {
  console.log("join group req body ", req.body)

    try {
      const user_id = req.body.user_id
      const group_id = req.body.group_id
    console.log("post joingroup ", user_id, group_id)

      // Insert groupmember into database
      insertGroupMember(user_id, group_id)
  
      return res.status(201).json(joinGroupObject(user_id, group_id));
    } catch (error) {
      console.error("Error in postGroup controller:", error);
      return next(error);
    }
  };

  // Function to create group object
const joinGroupObject = (user_id, group_id) => {
  return {
    user_id: user_id,
    group_id: group_id,
  };
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
console.log(req.body)
  try {
    const group_name = req.body.group_name
    const id_owner = req.body.owner_id
  console.log("post group ", group_name, id_owner)

    if (!group_name || group_name.trim() === "") {
        return next(new ApiError("Invalid group name", 400));
    }

    // Insert group into database
    const groupFromDb = await insertGroup(group_name, id_owner);


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


  export { postGroup, getGroupsObject, getGroupByIdObject, getGroupMembersObject, deleteGroupObject,joinGroup };