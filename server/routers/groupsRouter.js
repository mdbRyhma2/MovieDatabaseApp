import { Router } from "express";
import { getGroupsObject, postGroup, getGroupMembersObject, deleteGroupObject, getGroupByIdObject} from "../controllers/GroupsController.js";

const router = Router();

router.post("/groups",postGroup);
router.get("/groups",getGroupsObject);
router.get("/group/:id", getGroupByIdObject );
router.get("/group/:id/members",getGroupMembersObject);
router.delete("/group/:id", deleteGroupObject);

export default router;