import { groupsActions } from "../actions/groups.actions";
import { GroupRequest, fetchGroups as fetchGroupApi } from "../api/groups";
import { groupQueryMapSelector } from "../selectors/groups.selectors";
import { store } from "../store";

export const fetchGroups = (request: GroupRequest) => {
    const queryMap = groupQueryMapSelector(store.getState())
    const query = request.query;
    const groupIds = queryMap[query];
    groupsActions.query(query, !groupIds)

    if (groupIds) {
        return;

    }
    fetchGroupApi(request).then((groups) => {
        groupsActions.queryCompleted(query, groups);
    });
};
export { };