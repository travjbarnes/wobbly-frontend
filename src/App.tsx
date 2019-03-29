import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Font } from "expo";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { NavigationContainerComponent } from "react-navigation";

import { client, initClient } from "./apolloClient";
import AppNavigation from "./AppNavigation";
import AppWithSubscriptions from "./AppWithSubscriptions";
import { SplashScreen } from "./components/screens";
import { fonts } from "./fonts";
import { OWN_INFO_QUERY, OwnInfoQuery } from "./graphql/queries";
import { NavigationService } from "./services";

interface IAppState {
  clientHasLoaded: boolean;
  fontsHaveLoaded: boolean;
}
export default class App extends React.Component<{}, IAppState> {
  public constructor(props: {}) {
    super(props);
    this.state = { clientHasLoaded: false, fontsHaveLoaded: false };
  }

  public async componentDidMount() {
    await this.initClient();
    await this.initFonts();
  }

  public render() {
    if (!this.state.clientHasLoaded || !this.state.fontsHaveLoaded || !client) {
      return <SplashScreen />;
    }
    const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

    return (
      <ApolloProvider client={client}>
        <OwnInfoQuery query={OWN_INFO_QUERY}>
          {ownInfoResult => (
            <AppWithSubscriptions ownInfoResult={ownInfoResult}>
              <ActionSheetProvider>
                <AppNavigation
                  ref={(el: NavigationContainerComponent | null) => {
                    NavigationService.setTopLevelNavigator(el);
                  }}
                  persistenceKey={navigationPersistenceKey}
                />
              </ActionSheetProvider>
            </AppWithSubscriptions>
          )}
        </OwnInfoQuery>
      </ApolloProvider>
    );
  }

  private async initClient() {
    await initClient();
    this.setState({ clientHasLoaded: true });
  }

  private async initFonts() {
    await Font.loadAsync(fonts);
    this.setState({ fontsHaveLoaded: true });
  }
}
