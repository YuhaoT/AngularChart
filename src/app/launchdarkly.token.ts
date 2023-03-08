import { InjectionToken } from "@angular/core";
import { LDClient } from "launchdarkly-js-client-sdk";

export const LD_CLIENT_TOKEN = new InjectionToken<LDClient>("LDClient");