import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfileFollowings from "../../app/stores/ProfileFollowings";
import { useStore } from "../../app/stores/store";
import ProfileActivities from "./ProfileActivities";
import ProfilePhotos from "./ProfilePhotos";

interface Props{
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    const {profileStore} = useStore();
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Events', render: () => <ProfileActivities />},
        {menuItem: 'Followers', render: () => <ProfileFollowings />},
        {menuItem: 'Following', render: () => <ProfileFollowings />},
    ]

    return(
        <Tab 
            menu={{fluid:true, vertical:true}}
            menuPosition='right'
            panes = {panes}
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        />
    )
})