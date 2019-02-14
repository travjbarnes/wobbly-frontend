import * as React from "react";
import { NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData, TextInputProps } from "react-native";

interface IAutoExpandingInputState {
  height: number;
}
class AutoExpandingInput extends React.Component<TextInputProps, IAutoExpandingInputState> {
  constructor(props: TextInputProps) {
    super(props);
    this.state = { height: 0 };
  }

  public render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onContentSizeChange={this.onContentSizeChange}
        style={{ height: Math.max(35, this.state.height) }}
        value={this.props.value}
      />
    );
  }

  private onContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    this.setState({
      height: event.nativeEvent.contentSize.height
    });
  };
}

export default AutoExpandingInput;
