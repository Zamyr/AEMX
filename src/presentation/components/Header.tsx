import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useHeaderViewModel } from '../viewmodels/useHeaderViewModel';
import { textStyles } from '../../core/theme/typography';

export const Header: React.FC = () => {
  const { title, subtitle } = useHeaderViewModel();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, textStyles.headerTitle]}>{title}</Text>
      <Text style={[styles.subtitle, textStyles.headerSubtitle]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
  },
});
