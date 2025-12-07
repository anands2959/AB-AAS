import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

const { width } = Dimensions.get('window');

interface BenefitConfirmationModalProps {
  visible: boolean;
  benefit: {
    title: string;
    description: string;
    eligibility: string;
    amount?: string;
  } | null;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function BenefitConfirmationModal({
  visible,
  benefit,
  isLoading = false,
  onConfirm,
  onCancel,
}: BenefitConfirmationModalProps) {
  const { t } = useLanguage();

  if (!benefit) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="help-circle" size={60} color="#C03825" />
          </View>

          {/* Title */}
          <Text style={styles.title}>{t('confirmApplication')}</Text>

          {/* Benefit Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.benefitTitle}>{benefit.title}</Text>
            <Text style={styles.benefitDescription}>{benefit.description}</Text>

            <View style={styles.infoRow}>
              <Ionicons name="people-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{benefit.eligibility}</Text>
            </View>

            {benefit.amount && (
              <View style={styles.infoRow}>
                <Ionicons name="cash-outline" size={16} color="#666" />
                <Text style={styles.infoText}>{benefit.amount}</Text>
              </View>
            )}
          </View>

          {/* Message */}
          <Text style={styles.message}>{t('confirmApplicationMessage')}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text style={styles.confirmButtonText}>{t('apply')}</Text>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: width - 40,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#C03825',
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: '#666',
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#C03825',
    shadowColor: '#C03825',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#fff',
  },
});
