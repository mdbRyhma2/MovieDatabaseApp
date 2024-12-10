import { Router } from "express";
import { getGroupsObject, postGroup, getGroupMembersObject, deleteGroupObject, getGroupByIdObject, joinGroup} from "../controllers/GroupsController.js";

const router = Router();

router.post("/groups",postGroup);
router.post("/group/:id", joinGroup);
router.get("/groups",getGroupsObject);
router.get("/group/:id", getGroupByIdObject );
router.get("/group/:id/members",getGroupMembersObject);
router.delete("/group/:id", deleteGroupObject);

export default router;