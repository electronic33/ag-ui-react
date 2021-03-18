import React, { useRef, useState } from "react";
import Popover from "../Popover/Popover";
import MenuItem from "../MenuItem/MenuItem";

import "../../styles/index.css";
import Button from "../Button/Button";
import MenuList from "./MenuList";
import { Md3DRotation, MdAccessAlarm, MdClose } from "react-icons/md";
import MenuGroup from "./MenuGroup";
import MenuDivider from "./MenuDivider";

export default {
  title: "PopoverMenu",
  component: MenuItem,
};

export const Default = (props): React.ReactNode => {
  const trigger = "click";
  const [active, setActive] = useState(false);
  return (
    <div className="w-screen h-screen flex justify-center items-center space-x-3">
      <Button className="bg-yellow-400" text="Button with tooltip">
        I&apos;m a button
      </Button>
      <Popover
        active={active}
        setActive={setActive}
        direction="bottom"
        contentClassNames=""
        containterFocus={false}
        content={
          <MenuList>
            <MenuGroup title="With Icon">
              <MenuItem
                Icon={<MdClose />}
                // onClick={() => {
                //   setActive(false);
                //   alert("I was clicked");
                // }}
              >
                Item 1
              </MenuItem>
              <MenuItem Icon={<Md3DRotation />}>Item 2</MenuItem>
              <MenuItem Icon={<MdAccessAlarm />}>Item 3</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Without Icon">
              <MenuItem>Item 4</MenuItem>
              <MenuItem>Item 5</MenuItem>
            </MenuGroup>
          </MenuList>
        }
      >
        <Button className="bg-green-500" text="Button with tooltip">
          {trigger} me
        </Button>
      </Popover>
      <Button className="bg-yellow-400" text="Button with tooltip">
        I&apos;m a button
      </Button>
    </div>
  );
};
