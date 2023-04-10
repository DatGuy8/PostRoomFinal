import axios from "axios";
import FlexBox from "components/FlexBox";
import WidgetBox from "components/WidgetBox";
import UserProfilePhoto from "components/UserProfilePhoto";

const UserWidget = ({ userId, userPhoto }) => {

  return (
    <WidgetBox>
      <FlexBox>
        <UserProfilePhoto userPhoto={userPhoto} />
      </FlexBox>
    </WidgetBox>
  );
};

export default UserWidget;
