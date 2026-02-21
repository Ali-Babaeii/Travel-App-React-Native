import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { COLORS } from '../../constants/data';
import { CalendarModalProps } from '../../types';

type MarkedDates = Record<string, {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  selected?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
}>;

export const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  onSelectRange,
  selectedDateField,
  isRangePicker = false,
}) => {
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  const getTitle = (): string => {
    if (isRangePicker) {
      if (selectedDateField === 'flight-range') return 'Select Departure & Return Date';
      return 'Select Check-in & Check-out';
    }
    switch (selectedDateField) {
      case 'departure': return 'Select Departure Date';
      case 'return': return 'Select Return Date';
      default: return 'Select Date';
    }
  };

  const handleDayPress = (day: DateData): void => {
    if (isRangePicker) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(day.dateString);
        setRangeEnd(null);
      } else {
        const start = new Date(rangeStart);
        const end = new Date(day.dateString);
        if (end < start) {
          setRangeStart(day.dateString);
          setRangeEnd(rangeStart);
        } else {
          setRangeEnd(day.dateString);
        }
      }
    } else {
      const date = new Date(day.dateString);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      onSelectDate(formattedDate);
      onClose();
    }
  };

  const handleConfirm = (): void => {
    if (rangeStart && rangeEnd) {
      const startFormatted = new Date(rangeStart).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
      });
      const endFormatted = new Date(rangeEnd).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
      });
      onSelectRange(startFormatted, endFormatted, rangeStart, rangeEnd);
      setRangeStart(null);
      setRangeEnd(null);
      onClose();
    }
  };

  const handleCancel = (): void => {
    setRangeStart(null);
    setRangeEnd(null);
    onClose();
  };

  const getMarkedDates = (): MarkedDates => {
    const today = new Date().toISOString().split('T')[0];
    const marked: MarkedDates = {};

    if (isRangePicker && rangeStart) {
      if (!rangeEnd) {
        marked[rangeStart] = { startingDay: true, color: COLORS.primary, textColor: COLORS.white };
      } else {
        marked[rangeStart] = { startingDay: true, color: COLORS.primary, textColor: COLORS.white };
        marked[rangeEnd] = { endingDay: true, color: COLORS.primary, textColor: COLORS.white };

        let current = new Date(rangeStart);
        current.setDate(current.getDate() + 1);
        const end = new Date(rangeEnd);

        while (current < end) {
          const ds = current.toISOString().split('T')[0];
          marked[ds] = { color: `${COLORS.primary}30`, textColor: COLORS.text };
          current.setDate(current.getDate() + 1);
        }
      }
    } else if (!isRangePicker) {
      marked[today] = { selected: true, selectedColor: COLORS.primary, selectedTextColor: COLORS.white };
    }

    return marked;
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <Pressable style={styles.modalOverlay} onPress={handleCancel}>
        <Pressable style={styles.calendarModal} onPress={(e) => e.stopPropagation()}>

          {/* Header */}
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>{getTitle()}</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Range info bar */}
          {isRangePicker && rangeStart && (
            <View style={styles.rangeInfo}>
              <Text style={styles.rangeInfoText}>
                {rangeEnd
                  ? `${new Date(rangeStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → ${new Date(rangeEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  : selectedDateField === 'flight-range' ? 'Now select return date' : 'Now select check-out date'}
              </Text>
            </View>
          )}

          <Calendar
            onDayPress={handleDayPress}
            markedDates={getMarkedDates()}
            markingType={isRangePicker ? 'period' : 'simple'}
            minDate={today}
            theme={{
              backgroundColor: COLORS.white,
              calendarBackground: COLORS.white,
              textSectionTitleColor: COLORS.textLight,
              selectedDayBackgroundColor: COLORS.primary,
              selectedDayTextColor: COLORS.white,
              todayTextColor: COLORS.primary,
              dayTextColor: COLORS.text,
              textDisabledColor: '#d9d9d9',
              arrowColor: COLORS.primary,
              monthTextColor: COLORS.text,
              textDayFontWeight: '400',
              textMonthFontWeight: '700',
              textDayHeaderFontWeight: '600',
              textDayFontSize: 15,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 13,
            }}
            style={styles.calendar}
          />

          {/* Confirm / Cancel buttons */}
          {isRangePicker && rangeStart && rangeEnd && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  calendarModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.textLight,
    fontWeight: '300',
  },
  rangeInfo: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: `${COLORS.primary}10`,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rangeInfoText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
  calendar: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
