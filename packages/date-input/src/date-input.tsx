import React, { useEffect, useState } from 'react';
import { TextInput } from '@app-garage/text-input';
import { usePopper } from 'react-popper';
import ReactDOM from 'react-dom';
import { Calendar } from '@app-garage/calendar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format, isValid } from 'date-fns';
import { useTransition, animated, config } from 'react-spring';

type DateInputTypes = {
  isOpen?: boolean;
  setIsOpen: (isOpen?: boolean) => void;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  value?: string | Date;
  setValue: (prevValue?: string | Date) => void;
  onChange?: (event: any) => void;
  dateFormat?: string;
};

export const DateInput = ({
  isOpen,
  setIsOpen,
  label,
  placeholder,
  buttonText,
  value,
  setValue,
  onChange,
  dateFormat = 'd MMMM yyyy',
}: DateInputTypes): React.ReactElement => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLInputElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const [selectedDates, setSelectedDates] = useState<Date | Date[]>();

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translateY(0px)' },
    enter: { opacity: 1, transform: 'translateY(10px)' },
    leave: { opacity: 0, transform: 'translateY(0px)' },
    config: config.stiff,
  });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  useEffect(() => {
    // @ts-ignore
    function handleClickOutside(event) {
      if (
        isOpen &&
        popperElement &&
        !popperElement.contains(event.target) &&
        referenceElement &&
        !referenceElement.contains(event.target)
      ) {
        setIsOpen(false);
        if (value && isValid(new Date(value))) {
          setValue(format(new Date(value), dateFormat));
          setSelectedDates(new Date(value));
        } else if (selectedDates) {
          setValue(format(selectedDates as Date, dateFormat));
          setSelectedDates(selectedDates);
        } else {
          setValue(undefined);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    isOpen,
    setIsOpen,
    popperElement,
    referenceElement,
    value,
    setValue,
    selectedDates,
    dateFormat,
  ]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          if (isOpen && setIsOpen) {
            setIsOpen(false);
          }
          break;
        case 'ArrowDown':
          if (isOpen) {
            event.stopPropagation();
          }
          break;
        case 'ArrowUp':
          if (isOpen) {
            event.stopPropagation();
          }
          break;
        case 'ArrowRight':
          if (isOpen) {
            event.stopPropagation();
          }
          break;
        case 'ArrowLeft':
          if (isOpen) {
            event.stopPropagation();
          }
          break;

        default: {
          // no default
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, setIsOpen]);

  const selectHandler = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue(format(selectedDate, dateFormat));
    } else {
      setValue(undefined);
    }
    setSelectedDates(selectedDate);
  };

  return (
    <div>
      <TextInput
        onEnterPress={() => {
          if (value && isValid(new Date(value))) {
            setValue(format(new Date(value), dateFormat));
            setSelectedDates(new Date(value));
          } else if (selectedDates) {
            setValue(format(selectedDates as Date, dateFormat));
            setSelectedDates(selectedDates);
          } else {
            setValue(undefined);
          }
        }}
        containerClassName="w-96"
        ref={setReferenceElement}
        onFocus={() => {
          if (isValid(value)) setSelectedDates(value as Date);
          setIsOpen(true);
        }}
        // onBlur={() => setIsOpen(false)}
        label={label}
        placeholder={placeholder}
        buttonText={buttonText}
        value={value as string}
        onChange={onChange}
      />
      {transitions.map(
        ({ item, key, props }) =>
          item &&
          ReactDOM.createPortal(
            <animated.div
              key={key}
              ref={setPopperElement}
              style={{ ...props, ...styles.popper }}
              {...attributes.popper}
            >
              <Calendar
                calendarClassName="w-56"
                disabledTilesClassName={() => ''}
                LeftArrowIcon={FaChevronLeft}
                RightArrowIcon={FaChevronRight}
                selectedDate={selectedDates}
                // @ts-ignore
                selectHandler={selectHandler}
              />
            </animated.div>,
            document.body,
          ),
      )}
    </div>
  );
};

export default DateInput;
