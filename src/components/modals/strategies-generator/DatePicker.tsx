import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface DatePickerProps {
  onChange: (selectedDate: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [minDate, setMinDate] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth();
    const yyyy = today.getFullYear() - 3;
    const minDate = new Date(yyyy, mm, dd);
    setMinDate(minDate);
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const newDate = new Date(inputDate);
    setSelectedDate(newDate);
    onChange(newDate);
  };

  return (
    <Form.Group controlId="datepicker">
      <Form.Label>Date de mise en service</Form.Label>
      <Form.Control
        type="date"
        value={
          selectedDate != null ? selectedDate.toISOString().split('T')[0] : ''
        }
        min={minDate?.toISOString().split('T')[0]}
        max={new Date()?.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
    </Form.Group>
  );
};

export default DatePicker;
