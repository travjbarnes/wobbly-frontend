// tslint:disable:max-classes-per-file
import { Subscription } from "react-apollo";

import { onPostAdded } from "../../generated/onPostAdded";
import { onThreadAdded } from "../../generated/onThreadAdded";

export class PostAddedSubscription extends Subscription<onPostAdded> {}

export class ThreadAddedSubscription extends Subscription<onThreadAdded> {}
