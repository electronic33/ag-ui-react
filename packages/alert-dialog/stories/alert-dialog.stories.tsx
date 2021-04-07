import React, { useState } from 'react';
import { Button } from '@app-garage/button';
import { AlertDialog } from '../src';

export default {
  title: 'OVERLAY/AlertDialog',
  component: AlertDialog,
};

export const Top = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Alert!</Button>
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        headerText="Alert!"
        message="Alert messages can be used to notify the user about something special: danger, success, information or warning. "
      />
    </div>
  );
};
