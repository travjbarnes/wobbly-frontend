import * as React from "react";

import { Footer, WobblyButton } from "../atoms";

interface ICreateGroupFooterProps {
  onButtonPress: () => void;
}
const CreateGroupFooter: React.SFC<ICreateGroupFooterProps> = ({ onButtonPress }) => {
  const button = <WobblyButton onPress={onButtonPress}>{"Create new group"}</WobblyButton>;
  return <Footer text="Didn't find what you were looking for?" button={button} />;
};
export default CreateGroupFooter;
