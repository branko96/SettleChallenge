import * as React from 'react';
import {
  Picker as RNPicker,
  PickerProps as RNPickerProps,
} from '@react-native-picker/picker';
import styles from './styles';
import { ISymbol } from '../../interfaces/symbol';

interface PickerProps extends RNPickerProps {
  items: ISymbol[];
  setSelectedValue: (value: string) => void;
}

const Picker = ({ selectedValue, setSelectedValue, items }: PickerProps) => {
  return (
    <RNPicker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={setSelectedValue}>
      {items.map(i => {
        return <RNPicker.Item key={i.value} label={i.label} value={i.value} />;
      })}
    </RNPicker>
  );
};

export default Picker;
