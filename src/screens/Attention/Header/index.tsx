import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Header } from '../../../components';
import { Box } from '../Box';

interface IAttentionHeader {
  number: number;
}

export const AttentionHeader: FC<IAttentionHeader> = ({ number }) => {
  return (
    <Header>
      <Box number={number} style={styles.headerBox} />
    </Header>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: '#00ace6',
    borderColor: '#0086b3',
    height: 130,
    width: 130,
  },
});
