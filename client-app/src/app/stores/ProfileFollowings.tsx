import { observer } from "mobx-react-lite";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "../../features/profiles/ProfileCard";
import { useStore } from "./store";


export default observer(function ProfileFollowings() {
    const {profileStore} = useStore();
    const {profile, followings, loadingFollowings, activeTab} = profileStore;

    // console.log(typeof followings);
    // console.log(followings);

    const result = Array.isArray(followings) ? followings.map(element => element.displayName) : [];

    console.log(result);
    
   
    return(
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header 
                        floated='left' 
                        icon='user' 
                        content={activeTab === 3 ? 
                            `People following ${profile?.displayName}` : `People ${profile?.displayName} is following` } 
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {(followings).map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />                           
                            
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>

    )

})