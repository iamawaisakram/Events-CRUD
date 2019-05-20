import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';

//style
import styles from '../../../styles/UploadAd';

class TimeModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modal}
        onRequestClose={this.props.closeModal}
      >
        <View style={styles.calenderView}>
          <DatePicker
            style={styles.calender}
            date={
              this.props.setDate === 'startDate'
                ? this.props.startDate
                : this.props.endDate
            }
            mode="date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.props._setDate(date);
            }}
          />
          <TouchableOpacity
            style={styles.calenderDone}
            onPress={this.props.closeModal}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default TimeModal;
