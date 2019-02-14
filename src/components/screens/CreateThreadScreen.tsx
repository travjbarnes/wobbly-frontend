import { ApolloError } from "apollo-client";
import { Formik, FormikProps } from "formik";
import hoistNonReactStatics from "hoist-non-react-statics";
import { values } from "lodash";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationInjectedProps } from "react-navigation";
import * as yup from "yup";

import { getThreads } from "../../generated/getThreads";
import {
  CREATE_THREAD_MUTATION,
  CreateThreadMutation,
  CreateThreadMutationFn,
  CreateThreadMutationResult,
  CreateThreadMutationUpdaterFn
} from "../../graphql/mutations";
import { THREADS_QUERY } from "../../graphql/queries";
import { NavigationService } from "../../services";
import { FormErrors, FormField, FormLabel, WobblyButton } from "../atoms";

interface ICreateThreadFormFields {
  title: string;
  content: string;
}
interface ICreateThreadScreenProps extends NavigationInjectedProps {
  createThread: CreateThreadMutationFn;
  result: CreateThreadMutationResult;
}
class CreateThreadScreen extends React.Component<ICreateThreadScreenProps> {
  public static navigationOptions = {
    title: "New thread",
    headerRight: <Button type="clear" title="Cancel" onPress={NavigationService.goBack} />
  };
  private createThreadForm?: Formik<ICreateThreadFormFields> | null;

  public render() {
    const { result } = this.props;
    return (
      <Formik
        ref={el => (this.createThreadForm = el)}
        initialValues={{ title: "", content: "" }}
        onSubmit={this.handleCreateThread}
        validateOnChange={false}
        validationSchema={yup.object().shape({
          title: yup
            .string()
            .min(8)
            .max(100)
            .required(),
          content: yup.string().required()
        })}
      >
        {(formikBag: FormikProps<ICreateThreadFormFields>) => (
          <View>
            <FormErrors errors={values(formikBag.errors)} />
            <FormLabel>Title</FormLabel>
            <FormField onChangeText={formikBag.handleChange("title")} value={formikBag.values.title} />
            <FormLabel>Content</FormLabel>
            <FormField onChangeText={formikBag.handleChange("content")} value={formikBag.values.content} />
            <WobblyButton onPress={formikBag.handleSubmit} disabled={result.loading}>
              {result.loading ? <ActivityIndicator /> : "Submit"}
            </WobblyButton>
          </View>
        )}
      </Formik>
    );
  }

  private handleCreateThread = (vals: ICreateThreadFormFields) => {
    const groupId = this.props.navigation.getParam("groupId", "");
    const groupName = this.props.navigation.getParam("groupName", "");
    this.props
      .createThread({
        variables: {
          groupId,
          title: vals.title,
          content: vals.content
        }
      })
      .then(() => {
        NavigationService.navigate("ThreadsList", { groupId, groupName });
      })
      .catch((e: ApolloError) => {
        if (e && e.graphQLErrors) {
          this.createThreadForm!.setErrors({ title: e.graphQLErrors[0].message });
        }
      });
  };
}

const updateCache: CreateThreadMutationUpdaterFn = (cache, { data }) => {
  const groupId = data && data.createThread.group.id;
  const oldData = cache.readQuery<getThreads>({ query: THREADS_QUERY, variables: { groupId } });
  cache.writeQuery({
    query: THREADS_QUERY,
    variables: { groupId },
    data: {
      threads: (oldData!.threads || []).concat(data!.createThread)
    }
  });
};

const EnhancedComponent = ({ navigation }: NavigationInjectedProps) => (
  <CreateThreadMutation mutation={CREATE_THREAD_MUTATION} update={updateCache}>
    {(createThread, result) => (
      <CreateThreadScreen createThread={createThread} result={result} navigation={navigation} />
    )}
  </CreateThreadMutation>
);
export default hoistNonReactStatics(EnhancedComponent, CreateThreadScreen);
