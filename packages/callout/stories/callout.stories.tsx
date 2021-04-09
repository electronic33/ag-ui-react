import React from 'react';
import { Callout } from '../src';

export default {
  title: 'OVERLAY/Callout',
  component: Callout,
};

export const Top = (): React.ReactNode => (
  <div>
    <Callout intent="warning" header="This is a header">
      Alert messages can be used to notify the user about something special:
      danger, success, information or warning. Alert messages can be used to
      notify the user about something special: danger, success, information or
      warning. Alert messages can be used to notify the user about something
      special: danger, success, information or warning.
    </Callout>
  </div>
);
