import React from 'react';
import { AiFillAudio } from 'react-icons/ai';
import { Button } from '@app-garage/button';
import { ButtonGroup } from '../src';

export default {
  title: 'LERNA/ButtonGroup',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
};

export const Default = ({ onClick }): React.ReactNode => (
  <ButtonGroup color="red">
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
  </ButtonGroup>
);
export const Vertical = ({ onClick }): React.ReactNode => (
  <ButtonGroup color="red" vertical className="w-56">
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
  </ButtonGroup>
);
export const Outline = ({ onClick }): React.ReactNode => (
  <ButtonGroup color="blue" variant="outline">
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
  </ButtonGroup>
);
export const OutlineVertical = ({ onClick }): React.ReactNode => (
  <ButtonGroup color="blue" variant="outline" vertical className="w-56">
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
  </ButtonGroup>
);
export const NoBorder = ({ onClick }): React.ReactNode => (
  <ButtonGroup color="blue" variant="no-border">
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
  </ButtonGroup>
);
export const NoBorderVertical = ({ onClick }): React.ReactNode => (
  <ButtonGroup color="blue" variant="no-border" vertical className="w-56">
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
    <Button Icon={AiFillAudio} onClick={onClick}>
      Button
    </Button>
  </ButtonGroup>
);
