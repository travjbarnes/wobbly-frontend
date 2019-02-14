import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { Font, SecureStore } from "expo";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { NavigationContainerComponent } from "react-navigation";

import AppNavigation from "./AppNavigation";
import { SplashScreen } from "./components/screens";
import { NavigationService } from "./services";

interface IAppState {
  clientHasLoaded: boolean;
  fontsHaveLoaded: boolean;
}
export default class App extends React.Component<{}, IAppState> {
  private client?: ApolloClient<any>;

  public constructor(props: {}) {
    super(props);
    this.state = { clientHasLoaded: false, fontsHaveLoaded: false };
  }

  public async componentDidMount() {
    await this.initClient();
    await this.initFonts();
  }

  public render() {
    if (!this.state.clientHasLoaded || !this.state.fontsHaveLoaded || !this.client) {
      return <SplashScreen />;
    }
    const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
    return (
      <ApolloProvider client={this.client}>
        <AppNavigation
          ref={(el: NavigationContainerComponent | null) => {
            NavigationService.setTopLevelNavigator(el);
          }}
          persistenceKey={navigationPersistenceKey}
        />
      </ApolloProvider>
    );
  }

  private async initClient() {
    const httpLink = createHttpLink({
      // 10.0.3.2 is the IP of the host machine that Genymotion runs on
      // If running on a real device, set this to the local IP of your machine
      uri: __DEV__ ? "http://10.0.3.2:4000" : "https://staging.wobbly.app"
    });
    const authLink = setContext(async (_, { headers }) => {
      const token = await SecureStore.getItemAsync("token");
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ""
        }
      };
    });
    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
    this.setState({ clientHasLoaded: true });
  }

  private async initFonts() {
    await Font.loadAsync({
      "open-sans-regular": require("../assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-semi-bold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
      "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf")
    });
    this.setState({ fontsHaveLoaded: true });
  }
}
