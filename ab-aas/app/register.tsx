import { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageModal from '@/components/LanguageModal';
import DisabilityModal from '@/components/DisabilityModal';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const scrollViewRef = useRef<ScrollView>(null);
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [disabilityType, setDisabilityType] = useState('');
    const [disabilityPercentage, setDisabilityPercentage] = useState('');
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [disabilityModalVisible, setDisabilityModalVisible] = useState(false);

    const handleContinue = () => {
        // Add your registration logic here
        if (fullName && dob && phoneNumber) {
            router.replace('/dashboard');
        }
    };

    const formatDateInput = (text: string) => {
        // Remove all non-numeric characters
        const cleaned = text.replace(/\D/g, '');
        
        // Validate and format DD/MM/YYYY
        let formatted = '';
        
        if (cleaned.length >= 1) {
            // Day validation (01-31)
            let day = cleaned.slice(0, 2);
            if (cleaned.length === 1) {
                formatted = day;
            } else {
                const dayNum = parseInt(day);
                if (dayNum > 31) {
                    day = '31';
                } else if (dayNum === 0) {
                    day = '01';
                }
                formatted = day;
                
                if (cleaned.length >= 3) {
                    // Month validation (01-12)
                    let month = cleaned.slice(2, 4);
                    const monthNum = parseInt(month);
                    if (monthNum > 12) {
                        month = '12';
                    } else if (monthNum === 0 && cleaned.length >= 4) {
                        month = '01';
                    }
                    formatted += '/' + month;
                    
                    if (cleaned.length >= 5) {
                        // Year validation (must start with 19 or 20)
                        let year = cleaned.slice(4, 8);
                        if (year.length >= 1) {
                            // First digit must be 1 or 2
                            if (year[0] !== '1' && year[0] !== '2') {
                                year = '2' + year.slice(1);
                            }
                            // If starts with 1, second digit should be 9
                            if (year.length >= 2 && year[0] === '1' && year[1] !== '9') {
                                year = '19' + year.slice(2);
                            }
                            // If starts with 2, second digit should be 0
                            if (year.length >= 2 && year[0] === '2' && year[1] !== '0') {
                                year = '20' + year.slice(2);
                            }
                        }
                        formatted += '/' + year;
                    }
                }
            }
        }
        
        return formatted;
    };

    const handleDobChange = (text: string) => {
        const formatted = formatDateInput(text);
        setDob(formatted);
    };

    const onDateChange = (_event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const year = selectedDate.getFullYear();
            setDob(`${day}/${month}/${year}`);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <LinearGradient colors={['#F5E6D3', '#E8D4A0', '#D4B76A']} style={styles.container}>
            <Image
                source={require('@/assets/logo.png')}
                style={styles.backgroundLogo}
                resizeMode="contain"
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>{t('register')}</Text>
                            <TouchableOpacity 
                                 style={styles.languageButton}
                                onPress={() => setLanguageModalVisible(true)}
                            >
                                <Image
                                                source={require('@/assets/language.png')}
                                                style={styles.languageIcon}
                                                resizeMode="contain"
                                              />
                            </TouchableOpacity>
                        </View>

                        {/* Full Name Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('fullName')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('enterName')}
                                placeholderTextColor="#999"
                                value={fullName}
                                onChangeText={setFullName}
                            />
                        </View>

                        {/* DOB Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('dob')}</Text>
                            <View style={styles.inputWithIcon}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder={t('dobPlaceholder')}
                                    placeholderTextColor="#999"
                                    value={dob}
                                    onChangeText={handleDobChange}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                                <TouchableOpacity onPress={showDatepicker}>
                                    <Text style={styles.icon}>📅</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onDateChange}
                                maximumDate={new Date()}
                            />
                        )}

                        {/* Phone Number Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('phoneNumber')}</Text>
                            <View style={styles.phoneInputContainer}>
                                <View style={styles.countryCode}>
                                    <Text style={styles.countryCodeText}>+91</Text>
                                </View>
                                <TextInput
                                    style={styles.phoneInput}
                                    placeholder={t('phoneNumberPlaceholder')}
                                    placeholderTextColor="#999"
                                    value={phoneNumber}
                                    onChangeText={(text) => {
                                        const cleaned = text.replace(/\D/g, '');
                                        if (cleaned.length <= 10) {
                                            setPhoneNumber(cleaned);
                                        }
                                    }}
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                />
                            </View>
                        </View>

                        {/* Type of Disability Dropdown */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('typeOfDisability')}</Text>
                            <TouchableOpacity 
                                style={styles.dropdown}
                                onPress={() => setDisabilityModalVisible(true)}
                            >
                                <Text style={[
                                    styles.dropdownText,
                                    disabilityType && styles.dropdownTextSelected
                                ]}>
                                    {disabilityType ? t(disabilityType) : t('selectDisabilityType')}
                                </Text>
                                <Text style={styles.dropdownIcon}>▼</Text>
                            </TouchableOpacity>
                        </View>

                        {/* % of Disability Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('percentageOfDisability')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('enterPercentage')}
                                placeholderTextColor="#999"
                                value={disabilityPercentage}
                                onChangeText={setDisabilityPercentage}
                                keyboardType="numeric"
                                onFocus={() => {
                                    setTimeout(() => {
                                        scrollViewRef.current?.scrollToEnd({ animated: true });
                                    }, 100);
                                }}
                            />
                        </View>

                        {/* Privacy Policy Text */}
                        <Text style={styles.privacyText}>
                            {t('privacyPolicy')}{' '}
                            <Text style={styles.privacyLink}>{t('privacyPolicyLink')}</Text> {t('and')}{' '}
                            <Text style={styles.privacyLink}>{t('termsOfUse')}</Text>
                        </Text>

                        {/* Continue Button */}
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={handleContinue}
                        >
                            <Text style={styles.continueButtonText}>{t('continue')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                    
                <LanguageModal 
                    visible={languageModalVisible}
                    onClose={() => setLanguageModalVisible(false)}
                />
                
                <DisabilityModal
                    visible={disabilityModalVisible}
                    onClose={() => setDisabilityModalVisible(false)}
                    onSelect={setDisabilityType}
                    selectedDisability={disabilityType}
                />
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundLogo: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.3,
        zIndex: 0,
    },
    keyboardView: {
        flex: 1,
        zIndex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 40,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    title: {
        fontSize: 32,
        fontFamily: Fonts.bold,
        color: '#C03825',
        textAlign: 'center',
        flex: 1,
    },
    languageButton: {

        position: 'absolute',
        right: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
    languageIcon: {
        right: 0,
        width: 25,
        height: 25,
    },
    languageText: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#C03825',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 20,
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: '#333',
        paddingVertical: 10,
    },
    icon: {
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    countryCode: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRightWidth: 1,
        borderRightColor: '#E0E0E0',
    },
    countryCodeText: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#333',
    },
    phoneInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: '#333',
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    dropdownText: {
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: '#999',
    },
    dropdownTextSelected: {
        color: '#333',
    },
    dropdownIcon: {
        fontSize: 12,
        color: '#666',
    },
    privacyText: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#C03825',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        lineHeight: 18,
    },
    privacyLink: {
        fontFamily: Fonts.semiBold,
        textDecorationLine: 'underline',
    },
    continueButton: {
        backgroundColor: '#C03825',
        borderWidth:2,
        borderColor:'#fff',
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#CCB256',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    continueButtonText: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: '#fff',
    },
});
