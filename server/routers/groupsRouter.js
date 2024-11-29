import { Router } from "express";
import { getGroupsObject, postGroup, getGroupMembersObject } from "../controllers/GroupsController.js";

const router = Router();

router.post("/groups",postGroup);
router.get("/groups",getGroupsObject);
router.get("/group/:id/members",getGroupMembersObject);

export default router;